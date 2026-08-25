import Product from "./product.model.js";

export const createProductService = async (data) => {
  const product = await Product.create(data);

  return product;
};
