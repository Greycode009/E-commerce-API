import Merchant from "../merchant/merchant.model.js";
import Order from "../orders/order.model.js";
import User from "../user/user.model.js";

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const getUserByIdService = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;
};

export const getAllMerchantsService = async () => {
  const merchants = await Merchant.find().populate(
    "userId",
    "name email role verified"
  );
  return merchants;
};

export const getAllOrdersService = async () => {
  const orders = await Order.find().sort({ createdAt: -1 });
  return orders;
};
