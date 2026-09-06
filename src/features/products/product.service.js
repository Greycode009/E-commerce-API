import Product from "./product.model.js";

export const createProductService = async (merchantId, data) => {
  const product = await Product.create({
    ...data,
    merchant: merchantId,
  });

  return product;
};

export const getProductsService = async (search, category, minPrice, maxPrice) => {
  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

   if (minPrice !== undefined) {
    filter.price = {
      ...filter.price,
      $gte: Number(minPrice),
    };
  }

  if (maxPrice !== undefined) {
    filter.price = {
      ...filter.price,
      $lte: Number(maxPrice),
    };
  }


  const products = await Product.find(filter);

  return products;
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
  const product = await Product.findByIdAndDelete({
    _id: id,
    merchant: merchantId,
  });

  return product;
};
