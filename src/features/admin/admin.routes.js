import { Router } from "express";
import { getAllUsersService } from "./admin.service.js";
import {
  getAllMerchants,
  getAllOrders,
  getAllUsers,
  getUserById,
  getMerchantById,
  getOrderById,
} from "./admin.controllers.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const adminRouter = Router();
adminRouter.get("/users", authenticate, authorize("admin"), getAllUsers);
adminRouter.get(
  "/merchants",
  authenticate,
  authorize("/admin"),
  getAllMerchants
);
adminRouter.get("/orders", authenticate, authorize("admin"), getAllOrders);
adminRouter.get(
  "/users/:userId",
  authenticate,
  authorize("admin"),
  getUserById
);
adminRouter.get(
  "/merchants/:merchantId",
  authenticate,
  authorize("admin"),
  getMerchantById
);
adminRouter.get(
  "/orders/:orderId",
  authenticate,
  authorize("admin"),
  getOrderById
);

export default adminRouter;
