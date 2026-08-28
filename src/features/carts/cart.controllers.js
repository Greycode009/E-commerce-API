import { addCartItemService, getCartService } from "./cart.service.js";

export const getCart = async (req, res) => {
  const cart = await getCartService(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: cart,
  });
};

export const addCartItem = async (req, res) => {
  const cart = await addCartItemService(req.user.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Item added to cart successfully.",
    data: cart,
  });
};
