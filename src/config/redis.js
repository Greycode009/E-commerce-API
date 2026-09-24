import { createClient } from "redis";
import config from "./config.js";

const redisClient = createClient({
  url: config.REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

export const connectRedis = async () => {
  await redisClient.connect();
  console.log("Redis connected successfully");

  
};

export default redisClient;