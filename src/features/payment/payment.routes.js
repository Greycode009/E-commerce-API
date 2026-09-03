import { Router } from "express";
import { createPayment, updatePaymentStatus } from "./payment.controllers.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const paymentRouter = Router();

paymentRouter.post("/", authenticate, authorize("consumer"), createPayment);
paymentRouter.patch("/:paymentId/status", authenticate, authorize("consumer"), updatePaymentStatus);

export default paymentRouter;
