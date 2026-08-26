import { z } from "zod";

export const createProductValidation = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  category: z.string().min(1),
  imageUrl: z.string().url().optional(),
});
