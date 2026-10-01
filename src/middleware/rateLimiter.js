import redisClient from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
  try {
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

    return next();
  } catch (error) {
    console.error(
      "Redis unavailable, continuing without rate limiter:",
      error.message || error,
    );
    return next();
  }
};

export default rateLimiter;
