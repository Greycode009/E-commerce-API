
import AppError from "../../utils/AppError.js";
import Product from "../products/product.model.js";
import { addCartItemService, getCartService } from "./cart.service.js";

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

export const addCartItem = async (req, res) => {
    const cart = await addCartItemService(
        req.params.consumerId,
        req.body,
    )

    return res.status(200).json({
        success: true,
        message: "Item added to cart successfully.",
        data: cart, 
    })

}

