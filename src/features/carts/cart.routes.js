import { Router } from "express";
import { addCartItem, getCart } from "./cart.controllers.js";
import validate from "../../middleware/validate.js";
import { addCartItemValidation } from "./cart.validation.js";
import { authenticate } from "../../middleware/authenticate.js";

const cartRouter = Router();

cartRouter.get("/", authenticate, getCart);
cartRouter.post(
  "/items",
  authenticate,
  validate(addCartItemValidation),
  addCartItem,
);

export default cartRouter;
