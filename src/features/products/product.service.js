import Product from "./product.model.js";

export const createProductService = async (merchantId, data) => {
  const product = await Product.create({
    ...data,
    merchant: merchantId,
  });

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

export const updateProductByIdService = async (id, merchantId, data) => {
    const product = await Product.findOneAndUpdate(
        {
            _id: id,
            merchant: merchantId,
        },
        data,
        { new: true }
    );

    return product;
};

export const deleteProductByIdService = async (id, merchantId) => {
  const product = await Product.findByIdAndDelete(
    {
    _id: id,
    merchant: merchantId,
  });

  return product;
};
