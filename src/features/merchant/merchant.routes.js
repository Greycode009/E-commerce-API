import { Router } from "express";

import { registerMerchant } from "./merchant.controllers.js";
import validate from "../../middleware/validate.js";
import { merchantRegisterValidation } from "../user/user.validation.js"

const merchantRouter = Router();

merchantRouter.post(
    "/",
    validate(merchantRegisterValidation),
    registerMerchant,
);

export default merchantRouter;