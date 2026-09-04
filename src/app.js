import express from "express";

import productRouter from "./features/products/product.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cartRouter from "./features/carts/cart.routes.js";
import userRouter from "./features/user/user.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import merchantRouter from "./features/merchant/merchant.routes.js";
import orderRouter from "./features/orders/order.routes.js";
import paymentRouter from "./features/payment/payment.routes.js";
import adminRouter from "./features/admin/admin.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/merchant", merchantRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/admin", adminRouter);

app.use(errorMiddleware);

export default app;
