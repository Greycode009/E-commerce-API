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
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const productRouter = Router();

productRouter.post(
  "/",
  authenticate,
  authorize("merchant"),
  validate(createProductValidation),
  createProduct
);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.put(
  "/:id",
  authenticate,
  authorize("merchant"),
  validate(updateProductValidation),
  updateProduct
);
productRouter.delete(
  "/:id",
  authenticate,
  authorize("merchant"),
  deleteProduct
);

export default productRouter;
