import { Router } from "express";
import {
  loginUser,
  logoutAllDevices,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendOtp,
  verifyOtp,
} from "./user.controllers.js";
import {
  loginUserValidation,
  registerUserValidation,
  resendOtpValidation,
  verifyOtpValidation,
} from "./user.validation.js";
import validate from "../../middleware/validate.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const userRouter = Router();

userRouter.post("/register", validate(registerUserValidation), registerUser);
userRouter.post("/verify-otp", validate(verifyOtpValidation), verifyOtp);
userRouter.post("/resend-otp", validate(resendOtpValidation), resendOtp);
userRouter.post("/login", validate(loginUserValidation), loginUser);
userRouter.post("/refresh-token", refreshAccessToken);
userRouter.post("/logout", logoutUser);
userRouter.post("/logout-all", authenticate, logoutAllDevices);

export default userRouter;
