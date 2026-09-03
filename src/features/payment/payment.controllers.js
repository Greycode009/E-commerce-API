import { createPaymentService, updatePaymentStatusService } from "./payment.service.js";

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

export const updatePaymentStatus = async (req, res) => {
  const payment = await updatePaymentStatusService(
    req.user.id,
    req.params.paymentId,
    req.body.status
  );

  return res.status(200).json({
    success: true,
    message: "Payment status updated successfully.",
    data: payment,
  });
};
