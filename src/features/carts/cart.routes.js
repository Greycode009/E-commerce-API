import { Router } from "express";
import { getCart } from "./cart.controllers.js";

const cartRouter = Router();


cartRouter.get("/:consumerId", getCart);


export default cartRouter;