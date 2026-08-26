import { createProductService, getProductsService } from "./product.service.js";

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
