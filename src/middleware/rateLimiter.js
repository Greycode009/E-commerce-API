import redisClient from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate_limit:${ip}`;

  const currentCount = await redisClient.incr(key);

  if (currentCount === 1) {
    await redisClient.expire(key, 60);
  }

  if (currentCount > 10)
    return res.status(429).json({
      message: "Too many requests. Try again later.",
    });

  next();
};

export default rateLimiter;
