import { createOrderService } from "./order.service.js";

export const createOrder = async (req, res) => {
  const order = await createOrderService(req.user.id);

  return res.status(201).json({
    success: true,
    message: "Order created successfully.",
    data: order,
  });
};
