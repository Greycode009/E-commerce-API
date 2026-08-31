import AppError from "../../utils/AppError.js";
import User from "./user.model.js";
import argon2 from "argon2";
import crypto from "crypto";
import OTP from "./otp.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";
import Session from "./session.model.js";
import jwt from "jsonwebtoken";
import { sendOtp } from "../../utils/sendOtp.js";

export const registerUserService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError("Email already registered.", 409);
  }

  const hashedPassword = await argon2.hash(data.password, {
    type: argon2.argon2id,
  });

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  await sendOtp(data.email);
  user.password = undefined;

  return {
    user,
  };
};

export const verifyOtpService = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.verified) {
    throw new AppError("User is already verified.", 400);
  }

  const otpRecord = await OTP.findOne({
    email: data.email,
  });

  if (!otpRecord) {
    throw new AppError("OTP expired or not found.", 400);
  }

  const hashedOtp = crypto.createHash("sha256").update(data.otp).digest("hex");

  if (hashedOtp !== otpRecord.otp) {
    throw new AppError("Invalid OTP.", 400);
  }

  user.verified = true;

  await user.save();

  await OTP.deleteOne({
    _id: otpRecord._id,
  });

  return user;
};

export const resendOtpService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.verified) {
    throw new AppError("User is already verified.", 400);
  }

  await OTP.deleteMany({ email });

  const otp = generateOtp();

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  await OTP.create({
    email,
    otp: hashedOtp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail(
    email,
    "Your New Verification Code",
    `Your verification code is ${otp}. It expires in 10 minutes.`,
    getOtpHtml(otp)
  );
};

export const loginUserService = async (data) => {
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  if (!user.verified) {
    throw new AppError("Please verify your account first.", 403);
  }

  const isPasswordValid = await argon2.verify(user.password, data.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password.", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await Session.create({
    userId: user._id,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required.", 401);
  }

  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw new AppError("Invalid refresh token.", 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const accessToken = generateAccessToken(user);

    return accessToken;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Invalid or expired refresh token.", 401);
  }
};

export const logoutUserService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required.", 401);
  }

  await Session.deleteOne({ refreshToken });
};
export const logoutAllDevicesService = async (userId) => {
  await Session.deleteMany({ userId });
};
