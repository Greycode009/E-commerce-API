import { createPaymentService } from "./payment.service.js";

export const createPayment = async (req, res) => {
  const payment = await createPaymentService(
    req.user.id,
    req.body.orderId,
    req.body.method
  );

  return res.status(201).json({
    success: true,
    message: "Payment created successfully",
    data: payment,
  });
};
