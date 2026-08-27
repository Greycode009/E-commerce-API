import { Router } from "express";
import { registerUser } from "./user.controllers.js";
import { registerUserValidation } from "./user.validation.js";
import validate from "../../middleware/validate.js";

const userRouter = Router();

userRouter.post(
  "/register",
  validate(registerUserValidation),
  registerUser,
);

export default userRouter;