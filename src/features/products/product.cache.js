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
  const keys = await redisClient.keys("products:*");

  if (key.length > 0) {
    await redisClient.del(keys);
  }
};
