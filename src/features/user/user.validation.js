import { z } from "zod";

export const registerUserValidation = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

export const loginUserValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const verifyOtpValidation = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});
export const resendOtpValidation = z.object({
    email: z.string().email(),
});