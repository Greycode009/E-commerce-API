import Product from "./product.model.js";

export const createProductService = async (data) => {
  const product = await Product.create(data);

  return product;
};

export const getProductsService = async () => {
  const product = await Product.find();

  return product;
};

export const getProductByIdService = async (id) => {
  const product = await Product.findById(id);

  return product;
};

export const updateProductByIdService = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  return product;
};

export const deleteProductByIdService = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  return product;
};
