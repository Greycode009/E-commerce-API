import { Router } from "express";
import { registerUser, resendOtp, verifyOtp } from "./user.controllers.js";
import { registerUserValidation, resendOtpValidation, verifyOtpValidation } from "./user.validation.js";
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

export default userRouter;