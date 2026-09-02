import {
  cancelOrderService,
  createOrderService,
  getMerchantOrdersService,
  getMyOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} from "./order.service.js";

export const createOrder = async (req, res) => {
  const order = await createOrderService(req.user.id);

  return res.status(201).json({
    success: true,
    message: "Order created successfully.",
    data: order,
  });
};

export const getMyOrders = async (req, res) => {
  const orders = await getMyOrdersService(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully.",
    data: orders,
  });
};

export const getOrderById = async (req, res) => {
  const order = await getOrderByIdService(req.params.orderId, req.user.id);

  return res.status(200).json({
    success: true,
    message: "Order retrieved successfully.",
    data: order,
  });
};

export const getMerchantOrders = async (req, res) => {
  const orders = await getMerchantOrdersService(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully.",
    data: orders,
  });
};

export const updateOrderStatus = async (req, res) => {
  const order = await updateOrderStatusService(
    req.user.id,
    req.params.orderId,
    req.body.status
  );

  return res.status(200).json({
    success: true,
    message: "Order status updated successfully.",
    data: order,
  });
};

export const cancelOrder = async (req, res) => {
  const order = await cancelOrderService(req.user.id, req.params.orderId);

  return res.status(200).json({
    success: true,
    message: "Order cancelled successfully.",
    data: order,
  });
};
