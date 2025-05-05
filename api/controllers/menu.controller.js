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
    // Destructure fields from the request body
    const { name, price, addOns, notes, category, quantity } = req.body;

    // Validate required fields
    if (!name || price === undefined) {
      return next(errorHandler(400, "Name and price are required"));
    }

    const restaurantId = req.params.restaurantId; // Get restaurantId from params

    // Validate and sanitize addOns, ensuring they are correctly formatted
    const formattedAddOns = Array.isArray(addOns)
      ? addOns.map(addOn => ({
          name: addOn.name,
          price: Number(addOn.price), // Ensure addOn price is a number
        }))
      : [];

    // Validate quantity: ensure it is a number and handle edge cases like undefined, null, or non-numeric values
    let itemQuantity = Number(quantity); // Convert quantity to a number
    if (isNaN(itemQuantity) || itemQuantity <= 0) {
      itemQuantity = 1;  // Set to default value if quantity is invalid
    }

    // Construct the new menu item object, including the quantity field
    const newItem = new MenuItem({
      restaurantId,
      name,
      price: Number(price),  // Ensure price is a number
      addOns: formattedAddOns,
      category: category || "pizza", // Default to "pizza" if category is not provided
      notes: notes || "",  // Default to an empty string if notes are not provided
      quantity: itemQuantity,  // Add quantity to the new item
    });

    // Save the new item to the database
    await newItem.save();

    // Respond with the newly created menu item
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error adding menu item:", err);
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
