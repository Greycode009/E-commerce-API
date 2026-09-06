import Product from "./product.model.js";

export const createProductService = async (merchantId, data) => {
  const product = await Product.create({
    ...data,
    merchant: merchantId,
  });

  return product;
};

export const getProductsService = async (
  search,
  category,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10
) => {
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

  // Pagination
  const skip = (page - 1) * limit;

  const products = await Product.find(filter).skip(skip).limit(limit);

  const totalProducts = await Product.countDocuments(filter);

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      limit,
    },
  };
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
