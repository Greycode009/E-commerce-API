import { Router } from "express";

import { createProduct } from "./product.controllers.js";

const productRouter = Router();

productRouter.post("/", createProduct);

export default productRouter;
