import AppError from "../../utils/AppError.js";
import argon2 from "argon2";
import User from "../user/user.model.js";
import Merchant from "./merchant.model.js";

export const registerMerchantService = async (data) => {
    const existingUser = await User.findOne({
        email: data.email,
    });

    if (existingUser) {
        throw new AppError("Email already registered.", 409);
    }

    const hashedPassword = await argon2.hash(data.password, {
        type: argon2.argon2id,
    });

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: "merchant",
    });

    const merchant = await Merchant.create({
        userId: user._id,
        businessName: data.businessName,
        businessDescription: data.businessDescription,
    });
    user.password = undefined;

    return {
        user,
        merchant,
    };
};