import AppError from "../../utils/AppError.js";
import Order from "./order.model.js";
import Cart from "../carts/cart.model.js";
import Product from "../products/product.model.js";

export const createOrderService = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new AppError("Cart not found.", 404);
  }

  if (cart.items.length === 0) {
    throw new AppError("Cart is empty.", 400);
  }

  const products = [];

  // Validate products and stock
  for (const item of cart.items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new AppError(`Product "${item.title}" not found.`, 404);
    }

    if (item.quantity > product.stock) {
      throw new AppError(`Insufficient stock for "${product.title}".`, 400);
    }

    products.push(product);
  }

  // Create order items from cart
  const orderItems = cart.items.map((item) => ({
    productId: item.productId,
    title: item.title,
    quantity: item.quantity,
    price: item.price,
    imageUrl: item.imageUrl,
    merchantId: products.find(
      (product) => product._id.toString() === item.productId.toString()
    ).merchant,
  }));

  // Create order
  const order = await Order.create({
    userId,
    items: orderItems,
    subtotal: cart.subtotal,
    status: "pending",
  });

  // Reduce product stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    });
  }

  // Clear cart
  cart.items = [];
  cart.subtotal = 0;
  await cart.save();

  return order;
};

export const getMyOrdersService = async (userId) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return orders;
};

export const getOrderByIdService = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, userId });

  if (!order) {
    throw new AppError("Order not found.", 404);
  }
  return order;
};

export const getMerchantOrdersService = async (merchantId) => {
  const orders = await Order.find({ "items.merchantId": merchantId }).sort({
    createdAt: -1,
  });
  return orders;
};

export const updateOrderStatusService = async (merchantId, orderId, status) => {
  const order = await Order.findById({
    _id: orderId,
    "items.merchantId": merchantId,
  });

  if (!order) {
    throw new AppError("Order not found.", 404);
  }
  order.status = status;
  await order.save();
  return order;
};

export const cancelOrderService = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });

  if (!order) {
    throw new AppError("Order not found.", 404);
  }

  if (order.status !== "pending") {
    throw new AppError("Only pending orders can be cancelled.", 400);
  }

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: item.quantity },
    });
  }
  order.status = "cancelled";
  await order.save();

  return order;
};
