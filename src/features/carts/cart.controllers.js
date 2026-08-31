import {
  addCartItemService,
  clearCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
} from "./cart.service.js";

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

export const updateCartItem = async (req, res) => {
  const cart = await updateCartItemService(
    req.user.id,
    req.params.productId,
    req.body.quantity
  );

  return res.status(200).json({
    success: true,
    message: "Cart item updated successfully.",
    data: cart,
  });
};

export const removeCartItem = async (req, res) => {
  const cart = await removeCartItemService(
    req.user.id,
    req.params.productId
  );

  return res.status(200).json({
    success: true,
    message: "Cart item removed successfully.",
    data: cart,
  });
}

export const clearCart = async (req, res) => {
  const cart = await clearCartService(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Cart cleared successfully.",
    data: cart,
  });
};