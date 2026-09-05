import { Router } from "express";
import { createReview, updateReview } from "./review.controllers.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import Validate from "../../middleware/validate.js";
import { createReviewSchema, updateReviewSchema } from "./review.validation.js";

const reviewRouter = Router();

reviewRouter.post("/", authenticate, authorize("consumer"), Validate(createReviewSchema), createReview);
reviewRouter.patch(
  "/:reviewId",
  authenticate,
  authorize("consumer"),
  Validate(updateReviewSchema),
  updateReview
);

export default reviewRouter;
