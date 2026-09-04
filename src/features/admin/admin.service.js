import Merchant from "../merchant/merchant.model.js";
import User from "../user/user.model.js";

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const getAllMerchantsService = async () => {
  const merchants = await Merchant.find().populate("userId","name email role verified");
  return merchants;
};
