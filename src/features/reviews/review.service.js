import AppError from "../../utils/AppError.js";
import Order from "../orders/order.model.js";
import Product from "../products/product.model.js";
import User from "../user/user.model.js";
import Review from "./review.model.js";

export const createReviewService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const product = await Product.findById(data.productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  const order = await Order.findOne({
    userId,
    status: "confirmed",
    "items.productId": data.productId,
  });

  if (!order) {
    throw new AppError("You can only review products you purchased.", 403);
  }
  const existingReview = await Review.findOne({
    userId,
    productId: data.productId,
  });

  if (existingReview) {
    throw new AppError("You have already reviewed this product.", 400);
  }
  const review = await Review.create({
    userId: user._id,
    productId: product._id,
    rating: data.rating,
    comment: data.comment,
  });
  return review;
};
