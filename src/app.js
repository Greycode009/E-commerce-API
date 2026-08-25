import express from "express";

import productRouter from "./features/products/product.routes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

export default app;