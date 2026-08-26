
import { getCartService } from "./cart.service.js";

export const getCart = async (req, res) => {
    const cart = await getCartService(req.params.consumerId);

    if (!cart) {
        throw new Error("Cart not found", 404);
    }

    return res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
        data: cart,
    })
}
