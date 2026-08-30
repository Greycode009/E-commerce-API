import { Router } from "express";
import { addCartItem, getCart } from "./cart.controllers.js";
import validate from "../../middleware/validate.js";
import { addCartItemValidation } from "./cart.validation.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const cartRouter = Router();

cartRouter.get("/", authenticate, authorize("consumer"), getCart);
cartRouter.post(
  "/items",
  authenticate,
  authorize("consumer"),
  validate(addCartItemValidation),
  addCartItem
);

export default cartRouter;
