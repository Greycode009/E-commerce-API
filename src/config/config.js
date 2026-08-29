import "dotenv/config";

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables.");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

export default config;
