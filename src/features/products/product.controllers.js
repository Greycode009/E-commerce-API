import AppError from "../../utils/AppError.js";
import {
  createProductService,
  getProductByIdService,
  getProductsService,
} from "./product.service.js";

export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      data: products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get products.",
    });
  }
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
