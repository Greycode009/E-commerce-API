import Payment from "./payment.model.js";
import Order from "../orders/order.model.js";
import AppError from "../../utils/appError.js";
import { paymentSchema } from "./payment.validation.js";

export const createPaymentService = async (userId, orderId, method) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  if (order.userId.toString() !== userId.toString()) {
    throw new AppError("Access denied.", 403);
  }
  if (order.status === "cancelled") {
    throw new AppError("Cancelled orders cannot be paid.", 400);
  }
  //Check the duplicate Payment

  const existingPayment = await Payment.findOne({ orderId });
  if (existingPayment) {
    throw new AppError("Payment already exists for this order.", 400);
  }
  const payment = await Payment.create({
    userId,
    orderId,
    amount: order.subtotal,
    method,
    status: "pending",
  });
  return payment;
};
