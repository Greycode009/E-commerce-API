import {
  deleteUserService,
  getAllMerchantsService,
  getAllOrdersService,
  getAllUsersService,
  getMerchantByIdService,
  getOrderByIdService,
  getUserByIdService,
  updateUserStatusService,
} from "./admin.service.js";

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();

  return res.status(200).json({
    success: true,
    message: "All users fetched successfully.",
    data: users,
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

export const getAllMerchants = async (req, res) => {
  const merchants = await getAllMerchantsService();

  return res.status(200).json({
    success: true,
    message: "All merchants fetched successfully.",
    data: merchants,
  });
};

export const getMerchantById = async (req, res) => {
  const merchant = await getMerchantByIdService(req.params.merchantId);

  return res.status(200).json({
    success: true,
    message: "Merchant fetched successfully.",
    data: merchant,
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

export const getOrderById = async (req, res) => {
  const order = await getOrderByIdService(req.params.orderId);

  return res.status(200).json({
    success: true,
    message: "Order fetched successfully.",
    data: order,
  });
};

export const deleteUser = async (req, res) => {
  const user = await deleteUserService(req.params.userId);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
    data: user,
  });
};

export const updateUserStatus = async (req, res) => {
  const user = await updateUserStatusService(
    req.params.userId,
    req.body.isActive
  );

  return res.status(200).json({
    success: true,
    message: "User status updated successfully.",
    data: user,
  });
};
