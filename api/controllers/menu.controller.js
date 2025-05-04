import MenuItem from '../models/menuItem.model.js';
import { errorHandler } from '../utils/error.js';

// GET MENU
export const getMenu = async (req, res, next) => {
  try {
    const items = await MenuItem.find({
      restaurantId: req.params.restaurantId
    });

    if (!items.length) return next(errorHandler(404, "No menu items found"));

    res.status(200).json(items);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch menu items"));
  }
};

// ADD MENU ITEM
export const addMenuItem = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) return next(errorHandler(400, "Name and price are required"));

    const newItem = new MenuItem({
      ...req.body,
      restaurantId: req.params.restaurantId
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    next(errorHandler(500, "Failed to add menu item"));
  }
};

// UPDATE MENU ITEM
export const updateMenuItem = async (req, res, next) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(
      req.params.menuId,
      req.body,
      { new: true }
    );

    if (!updated) return next(errorHandler(404, "Menu item not found"));

    res.status(200).json(updated);
  } catch (err) {
    next(errorHandler(500, "Failed to update menu item"));
  }
};

// DELETE MENU ITEM
export const deleteMenuItem = async (req, res, next) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.menuId);
    if (!deleted) return next(errorHandler(404, "Menu item not found"));

    res.status(200).json("Item deleted");
  } catch (err) {
    next(errorHandler(500, "Failed to delete menu item"));
  }
};
