import { createReviewService } from "./review.service.js";

export const createReview = async (req, res) => {
  const review = await createReviewService(req.user.id, req.body);
  return res.status(201).json({
    success: true,
    message: "Review created successfully.",
    data: review,
  });
};
