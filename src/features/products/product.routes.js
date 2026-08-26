import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./product.controllers.js";
import {
  createProductValidation,
  updateProductValidation,
} from "./product.validation.js";
import validate from "../../middleware/validate.js";

const productRouter = Router();

productRouter.post("/", validate(createProductValidation), createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", validate(updateProductValidation), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
