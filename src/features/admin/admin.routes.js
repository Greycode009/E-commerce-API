import { Router } from "express";
import { getAllUsersService } from "./admin.service.js";
import { getAllMerchants, getAllUsers } from "./admin.controllers.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const adminRouter = Router();
adminRouter.get("/users", authenticate, authorize("admin"), getAllUsers);
adminRouter.get(
  "/merchants",
  authenticate,
  authorize("admin"),
  getAllMerchants
);

export default adminRouter;
