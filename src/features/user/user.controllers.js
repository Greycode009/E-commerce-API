import {
    registerUserService,
    verifyOtpService,
    resendOtpService,
} from "./user.service.js";

export const registerUser = async (req, res) => {
    const { user, otp } = await registerUserService(req.body);

    return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: { user, otp }
    })
}

export const verifyOtp = async (req, res) => {
    const user = await verifyOtpService(req.body);

    return res.status(200).json({
        success: true,
        message: "OTP verified successfully.",
        data: user,
    })
}

export const resendOtp = async (req, res) => {
  await resendOtpService(req.body.email);

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully.",
  });
};