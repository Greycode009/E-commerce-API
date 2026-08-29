import { Router } from "express";

import {
  getMerchantProfile,
  registerMerchant,
} from "./merchant.controllers.js";
import validate from "../../middleware/validate.js";
import { merchantRegisterValidation } from "../user/user.validation.js";
import { authorize } from "../../middleware/authorize.js";
import { authenticate } from "../../middleware/authenticate.js";

const merchantRouter = Router();

merchantRouter.post(
  "/",
  validate(merchantRegisterValidation),
  registerMerchant
);
merchantRouter.get(
  "/profile",
  authenticate,
  authorize("merchant"),
  getMerchantProfile
);

export default merchantRouter;
