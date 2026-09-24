import "dotenv/config";

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables.");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in environment variables.");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,
};

export default config;
