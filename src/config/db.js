import mongoose from "mongoose";
import config from "./config.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1"]);

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
