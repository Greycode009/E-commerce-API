import AppError from "../../utils/AppError.js";
import Merchant from "./merchant.model.js";
import { registerMerchantService } from "./merchant.service.js";

export const registerMerchant = async (req, res) => {
  const { user, merchant } = await registerMerchantService(req.body);

  return res.status(201).json({
    success: true,
    message: "Merchant registered successfully.",
    data: {
      user,
      merchant,
    },
  });
};

export const getMerchantProfile = async (req, res) => {
  const merchant = await Merchant.findOne({
    userId: req.user.id,
  });

  if (!merchant) {
    throw new AppError("Merchant profile not found.", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Merchant profile fetched successfully.",
    data: merchant,
  });
};
