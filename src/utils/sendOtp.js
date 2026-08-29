import { generateOtp } from "./generateOtp.js";
import crypto from "crypto";
import OTP from "../features/user/otp.model.js";
import { sendEmail } from "./sendEmail.js";
import { getOtpHtml } from "./getOtpHtml.js";

export const sendOtp = async (email) => {
  const otp = generateOtp();

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  await OTP.create({
    email,
    otp: hashedOtp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail(
    email,
    "Verify Your E-Commerce Account",
    `Your verification code is ${otp}. It expires in 10 minutes.`,
    getOtpHtml(otp)
  );
};
