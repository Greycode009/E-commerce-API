import { z } from "zod";

export const paymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  method: z.enum(
    ["cod", "online"],
    "Payment method must be either 'cod' or 'online'"
  ),
});
