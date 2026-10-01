import redisClient from "../../config/redis.js";

export const createProductCacheKey = ({
  search,
  category,
  minPrice,
  maxPrice,
  page,
  limit,
  sort,
}) => {
  return `products:${JSON.stringify({
    search,
    category,
    minPrice,
    maxPrice,
    page,
    limit,
    sort,
  })}`;
};

export const invalidateProductCache = async (redisClient) => {
  try {
    const keys = await redisClient.keys("products:*");

    if (keys && keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error("Redis cache invalidation skipped:", error.message || error);
  }
};
