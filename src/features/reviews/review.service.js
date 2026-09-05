import AppError from "../../utils/appError";
import Order from "../orders/order.model";
import Product from "../products/product.model";
import User from "../user/user.model";
import Review from "./review.model";

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
  const review = await Review.create({
    userId: user._id,
    productId: product._id,
    rating: data.rating,
    comment: data.comment,
  });
  return review;
};
