import { Router } from "express";
import {
  cancelOrder,
  createOrder,
  getMerchantOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "./order.controllers.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const orderRouter = Router();

orderRouter.post("/", authenticate, authorize("consumer"), createOrder);
orderRouter.get("/my-orders", authenticate, authorize("consumer"), getMyOrders);
orderRouter.get(
  "/merchant",
  authenticate,
  authorize("merchant"),
  getMerchantOrders
);
orderRouter.get("/:orderId", authenticate, authorize("consumer"), getOrderById);
orderRouter.patch("/:orderId/status", authenticate, authorize("merchant"), updateOrderStatus);
orderRouter.patch("/:orderId/cancel", authenticate, authorize("consumer"), cancelOrder);

export default orderRouter;
