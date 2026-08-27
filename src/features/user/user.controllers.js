import {
    registerUserService,
    verifyOtpService,
    resendOtpService,
    loginUserService,
    refreshAccessTokenService,
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

//Login Controller

export const loginUser = async (req, res) => {
    const { user, accessToken, refreshToken } = await loginUserService(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        message: "Login successfully.",
        data: {
            user, accessToken,
        }
    })
}

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log("Refresh token:", refreshToken);

    const accessToken = await refreshAccessTokenService(refreshToken);

    return res.status(200).json({
        success: true,
        message: "Access token refreshed successfully.",
        data: {
            accessToken,
        },
    });
};