import { Router } from "express";
import { addCartItem, getCart } from "./cart.controllers.js";
import validate from "../../middleware/validate.js";
import { addCartItemValidation } from "./cart.validation.js";

const cartRouter = Router();


cartRouter.get("/:consumerId", getCart);
cartRouter.post("/:consumerId/items", validate(addCartItemValidation), addCartItem);



export default cartRouter;