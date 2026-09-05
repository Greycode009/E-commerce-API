import {
  createReviewService,
  deleteReviewService,
  getProductReviewsService,
  updateReviewService,
} from "./review.service.js";

export const createReview = async (req, res) => {
  const review = await createReviewService(req.user.id, req.body);
  return res.status(201).json({
    success: true,
    message: "Review created successfully.",
    data: review,
  });
};

export const updateReview = async (req, res) => {
  const review = await updateReviewService(
    req.user.id,
    req.params.reviewId,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Review updated successfully.",
    data: review,
  });
};

export const deleteReview = async (req, res) => {
  await deleteReviewService(req.user.id, req.params.reviewId);

  return res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
  });
};

export const getProductReviews = async (req, res) => {
  const reviews = await getProductReviewsService(req.params.productId);

  return res.status(200).json({
    success: true,
    message: "Product reviews fetched successfully.",
    data: reviews,
  });
};
