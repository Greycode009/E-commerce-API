import AppError from "../../utils/AppError.js";
import Cart from "./cart.model.js";
import Product from "../products/product.model.js";

export const getCartService = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  return cart;
};

export const addCartItemService = async (userId, data) => {
  const product = await Product.findById(data.productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  if (data.quantity > product.stock) {
    throw new AppError("Insufficient stock.", 400);
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
      subtotal: 0,
    });
  }
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === data.productId
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + data.quantity;

    if (newQuantity > product.stock) {
      throw new AppError("Insufficient stock", 400);
    }
    existingItem.quantity = newQuantity;
  }
  if (!existingItem) {
    cart.items.push({
      productId: product._id,
      title: product.title,
      quantity: data.quantity,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  }
  cart.subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  await cart.save();
  return cart;
};
