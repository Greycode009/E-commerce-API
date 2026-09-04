import {
  getAllMerchantsService,
  getAllOrdersService,
  getAllUsersService,
  getUserByIdService,
} from "./admin.service.js";

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();

  return res.status(200).json({
    success: true,
    message: "All users fetched successfully.",
    data: users,
  });
};
export const getAllMerchants = async (req, res) => {
  const merchants = await getAllMerchantsService();

  return res.status(200).json({
    success: true,
    message: "All merchants fetched successfully.",
    data: merchants,
  });
};
export const getAllOrders = async (req, res) => {
  const orders = await getAllOrdersService();

  return res.status(200).json({
    success: true,
    message: "All orders fetched successfully.",
    data: orders,
  });
};

export const getUserById = async (req, res) => {
  const user = await getUserByIdService(req.params.userId);

  return res.status(200).json({
    success: true,
    message: "User fetched successfully.",
    data: user,
  });
};
