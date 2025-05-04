import Cart from '../models/cart.model.js';
import { errorHandler } from '../utils/error.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.menuItemId");
    if (!cart) return next(errorHandler(404, "Cart not found"));
    res.status(200).json(cart);
  } catch (err) {
    next(errorHandler(500, "Failed to get cart"));
  }
};

export const addCartItem = async (req, res, next) => {
  try {
    if (!req.body.menuItemId || !req.body.quantity) {
      return next(errorHandler(400, "Menu item and quantity are required"));
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $push: { items: req.body } },
      { new: true, upsert: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    next(errorHandler(500, "Failed to add item to cart"));
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return next(errorHandler(400, "Quantity must be at least 1"));
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id, "items._id": itemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) return next(errorHandler(404, "Cart or item not found"));

    res.status(200).json(cart);
  } catch (err) {
    next(errorHandler(500, "Failed to update cart item"));
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { items: { _id: req.params.itemId } } },
      { new: true }
    );

    if (!cart) return next(errorHandler(404, "Cart not found"));

    res.status(200).json(cart);
  } catch (err) {
    next(errorHandler(500, "Failed to delete cart item"));
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [] },
      { new: true }
    );

    if (!cart) return next(errorHandler(404, "Cart not found"));

    res.status(200).json("Cart cleared");
  } catch (err) {
    next(errorHandler(500, "Failed to clear cart"));
  }
};
