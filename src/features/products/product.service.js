import Product from "./product.model.js";

export const createProductService = async (data) => {
  const product = await Product.create(data);

  return product;
};

export const getProductsService = async () => {
  const product = await Product.find();

  return product;
};
