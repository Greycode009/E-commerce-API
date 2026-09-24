import "dotenv/config";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import { connectRedis } from "./src/config/redis.js";


connectDB();
connectRedis();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
