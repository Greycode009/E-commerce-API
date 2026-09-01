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

  // Validate products and stock
  for (const item of cart.items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new AppError(`Product "${item.title}" not found.`, 404);
    }

    if (item.quantity > product.stock) {
      throw new AppError(`Insufficient stock for "${product.title}".`, 400);
    }
  }

  // Create order items from cart
  const orderItems = cart.items.map((item) => ({
    productId: item.productId,
    title: item.title,
    quantity: item.quantity,
    price: item.price,
    imageUrl: item.imageUrl,
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
