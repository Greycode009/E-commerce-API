import express from "express";

import productRouter from "./features/products/product.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cartRouter from "./features/carts/cart.routes.js";   

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use(errorMiddleware);

export default app;
