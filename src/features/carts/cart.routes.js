import { Router } from "express";
import { addCartItem, clearCart, getCart, removeCartItem, updateCartItem } from "./cart.controllers.js";
import validate from "../../middleware/validate.js";
import {
  addCartItemValidation,
  updateCartItemValidation,
} from "./cart.validation.js";
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
cartRouter.patch(
  "/items/:productId",
  authenticate,
  authorize("consumer"),
  validate(updateCartItemValidation),
  updateCartItem
);
cartRouter.delete(
  "/items/:productId",
  authenticate,
  authorize("consumer"),
  removeCartItem
);
cartRouter.delete(
  "/",
  authenticate,
  authorize("consumer"),
  clearCart
);


export default cartRouter;
