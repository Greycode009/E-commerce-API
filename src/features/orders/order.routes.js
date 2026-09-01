import { Router } from "express";
import { createOrder } from "./order.controllers.js";
import {authenticate} from "../../middleware/authenticate.js";
import {authorize} from "../../middleware/authorize.js";


const orderRouter = Router();



orderRouter.post(
  "/",
  authenticate,
  authorize("consumer"),
  createOrder
);

export default orderRouter;