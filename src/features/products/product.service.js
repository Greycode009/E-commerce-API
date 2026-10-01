import redisClient from "../../config/redis.js";
import {
  createProductCacheKey,
  invalidateProductCache,
} from "./product.cache.js";
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
  limit = 10,
  sort,
) => {
  console.log("GET PRODUCTS SERVICE REACHED");
  const cacheKey = createProductCacheKey({
    search,
    category,
    minPrice,
    maxPrice,
    page,
    limit,
    sort,
  });

  try {
    const cachedProducts = await redisClient.get(cacheKey);

    if (cachedProducts) {
      console.log("CACHE HIT");
      return JSON.parse(cachedProducts);
    }

    console.log("CACHE MISS");
  } catch (error) {
    console.error("Redis cache unavailable:", error.message);
  }

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
  //sort
  let sortOption = {};

  if (sort === "price_asc") {
    sortOption.price = 1;
  } else if (sort === "price_desc") {
    sortOption.price = -1;
  } else if (sort === "newest") {
    sortOption.createdAt = -1;
  } else if (sort === "oldest") {
    sortOption.createdAt = 1;
  }

  // Pagination
  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(filter);

  const totalPages = Math.ceil(totalProducts / limit);

  const result = {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      limit,
    },
  };
  try {
    await redisClient.set(cacheKey, JSON.stringify(result), {
      EX: 60,
    });
  } catch (error) {
    console.error("Redis cache unavailable:", error.message);
  }

  return result;
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
    { new: true },
  );

  if (product) {
    try {
      await invalidateProductCache(redisClient);
    } catch (error) {
      console.error("Redis cache invalidation failed:", error.message || error);
    }
  }

  return product;
};

export const deleteProductByIdService = async (id, merchantId) => {
  const product = await Product.findByIdAndDelete({
    _id: id,
    merchant: merchantId,
  });

  if (product) {
    try {
      await invalidateProductCache(redisClient);
    } catch (error) {
      console.error("Redis cache invalidation failed:", error.message || error);
    }
  }

  return product;
};
