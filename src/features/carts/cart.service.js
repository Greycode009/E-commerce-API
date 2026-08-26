import Cart from "./cart.model.js"

export const getCartService = async (consumerId) => {
    const cart = await Cart.findOne({ consumerId });

    return cart;
}

