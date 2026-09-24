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
