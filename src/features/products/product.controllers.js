import AppError from "../../utils/AppError.js";
import {
  createProductService,
  deleteProductByIdService,
  getProductByIdService,
  getProductsService,
  updateProductByIdService,
} from "./product.service.js";

export const createProduct = async (req, res) => {
  const product = await createProductService(req.user.id, req.body);

  return res.status(201).json({
    success: true,
    data: product,
  });
};

export const getProducts = async (req, res) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sort,
  } = req.query;
  const result = await getProductsService(
    search,
    category,
    minPrice,
    maxPrice,
    Number(page),
    Number(limit),
    sort
  );

  res.status(200).json({
    success: true,
    message: "Products fetched successfully.",
    data: result,
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

export const updateProduct = async (req, res) => {
  const product = await updateProductByIdService(
    req.params.id,
    req.user.id,
    req.body
  );

  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    data: product,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await deleteProductByIdService(req.params.id, req.user.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
    data: product,
  });
};
