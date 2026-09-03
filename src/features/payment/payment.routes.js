import { Router } from "express";
import { createPayment } from "./payment.controllers.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const paymentRouter = Router();

paymentRouter.post("/", authenticate, authorize("consumer"), createPayment);

export default paymentRouter;
