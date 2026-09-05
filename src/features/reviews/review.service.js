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

export const updateReviewService = async (userId, reviewId, data) => {
  const review = await Review.findOneAndUpdate(
    {
      _id: reviewId,
      userId,
    },
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!review) {
    throw new AppError("Review not found.", 404);
  }

  return review;
};

export const deleteReviewService = async (userId, reviewId) => {
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    userId,
  });

  if (!review) {
    throw new AppError("Review not found.", 404);
  }

  return review;
};

export const getProductReviewsService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  return await Review.find({ productId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};

