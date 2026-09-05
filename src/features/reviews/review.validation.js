import { z } from "zod";

const createReviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Comment is required").max(200).trim(),
});

const updateReviewSchema = z
  .object({
    rating: z.number().min(1).max(5).optional(),
    comment: z
      .string()
      .min(1, "Comment is required")
      .max(200)
      .trim()
      .optional(),
  })
  .refine((data) => data.rating !== undefined || data.comment !== undefined, {
    message: "At least one of 'rating' or 'comment' is required",
  });
