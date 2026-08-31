import { z } from "zod";

export const addCartItemValidation = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
});

export const updateCartItemValidation = z.object({
  quantity: z.number().int().min(1),
});
