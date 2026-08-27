import { z } from "zod";

export const registerUserValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});