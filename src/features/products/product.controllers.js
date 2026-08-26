import AppError from "../../utils/AppError.js";
import {
  createProductService,
  getProductByIdService,
  getProductsService,
  updateProductByIdService,
} from "./product.service.js";

export const createProduct = async (req, res) => {
  const product = await createProductService(req.body);

  return res.status(201).json({
    success: true,
    data: product,
  });
};

export const getProducts = async (req, res) => {
  const products = await getProductsService();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully.",
    data: products,
  });
};

export const getProductById = async (req, res) => {
  const product = await getProductByIdService(req.params.id);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Product fetched successfully.",
    data: product,
  });
};

export const updateProductById = async (req, res) => {
  const product = await updateProductByIdService(req.params.id, req.body.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    data: product,
  });
};
