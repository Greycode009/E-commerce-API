import AppError from "../../utils/AppError.js";
import { generateOtp } from "../../utils/generateOtp.js";
import User from "./user.model.js"
import argon2 from "argon2";
import crypto from "crypto";
import OTP from "./otp.model.js"

export const registerUserService = async (data) => {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
        throw new AppError("Email already registered.", 409)
    }

    const hashedPassword = await argon2.hash(data.password, {
        type: argon2.argon2d,
    })

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    })

    const otp = generateOtp();

    const hashedOtp = crypto.createHash("sha256").update(otp).digest('hex');

    await OTP.create({
        email: data.email,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    return {
        user, otp,
    };

};