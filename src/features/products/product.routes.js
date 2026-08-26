import { Router } from "express";

import { createProduct, getProducts } from "./product.controllers.js";
import { createProductValidation } from "./product.validation.js";
import validate from "../../middleware/validate.js";

const productRouter = Router();

productRouter.post("/", validate(createProductValidation), createProduct);
productRouter.get("/", getProducts);

export default productRouter;
