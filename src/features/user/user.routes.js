import { Router } from "express";
import { loginUser, refreshAccessToken, registerUser, resendOtp, verifyOtp } from "./user.controllers.js";
import { loginUserValidation, registerUserValidation, resendOtpValidation, verifyOtpValidation } from "./user.validation.js";
import validate from "../../middleware/validate.js";

const userRouter = Router();

userRouter.post(
    "/register",
    validate(registerUserValidation),
    registerUser,
);
userRouter.post(
    "/verify-otp",
    validate(verifyOtpValidation),
    verifyOtp,
);
userRouter.post(
    "/resend-otp",
    validate(resendOtpValidation),
    resendOtp,
);
userRouter.post("/login", validate(loginUserValidation), loginUser);
userRouter.post(
    "/refresh-token",
    refreshAccessToken,
);


export default userRouter;