import { registerMerchantService } from "./merchant.service.js";

export const registerMerchant = async (req, res) => {
    const { user, merchant } = await registerMerchantService(req.body);

    return res.status(201).json({
        success: true,
        message: "Merchant registration submitted successfully.",
        data: {
            user,
            merchant,
        },
    });
};
