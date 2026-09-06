import { z } from "zod";

export const createProductValidation = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  category: z.string().min(1),
  imageUrl: z.string().url().optional(),
});

export const updateProductValidation = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  category: z.string().min(1),
  imageUrl: z.string().url().optional(),
});

export const productQueryValidation = z
  .object({
    search: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    sort: z.enum(["price_asc", "price_desc", "newest", "oldest"]).optional(),
  })
  .refine(
    (data) =>
      data.minPrice === undefined ||
      data.maxPrice === undefined ||
      data.minPrice <= data.maxPrice,
    {
      message: "Minimum price cannot be greater than maximum price.",
      path: ["minPrice"],
    }
  );
