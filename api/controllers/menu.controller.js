import MenuItem from '../models/menuItem.model.js';
import { errorHandler } from '../utils/error.js';

// GET MENU
export const getMenu = async (req, res, next) => {
  try {
    const items = await MenuItem.find(); // Fetch all menu items, regardless of availability


    // If no items are found, send a 404 error
    if (!items.length) return next(errorHandler(404, "No menu items found"));

    // Respond with the fetched items
    res.status(200).json(items);
  } catch (err) {
    // Handle errors and send a 500 response if fetching fails
    next(errorHandler(500, "Failed to fetch menu items"));
  }
};


// ADD MENU ITEM
export const addMenuItem = async (req, res, next) => {
  try {
    // Destructure fields from the request body
    const { name, price, category, isAvailable } = req.body;

    // Validate that required fields are provided
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    // Construct the new menu item
    const newMenuItem = new MenuItem({
      name,
      price: Number(price),
      category: category || "pizza", // Default to "pizza" if not provided
      isAvailable: typeof isAvailable === "boolean" ? isAvailable : true, // Default to true if not provided
    });

    // Save the new menu item to the database
    await newMenuItem.save();

    // Respond with the newly created menu item
    res.status(201).json({
      success: true,
      menuItem: newMenuItem,
    });
  } catch (err) {
    console.error("Error adding menu item:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to add menu item",
      error: err.message,
    });
  }
};




// UPDATE MENU ITEM
export const updateMenuItem = async (req, res, next) => {
  try {
    // Check if the menu item ID exists in the request body
    const menuId = req.params.menuId;

    // Attempt to update the menu item by ID and only allow the fields you want to update
    const updated = await MenuItem.findByIdAndUpdate(
      menuId, // Use menuId from request params
      req.body, // Update the menu item with the data from the request body
      { new: true, runValidators: true } // Ensure validation is run on the updated data
    );

    // If the item is not found, return a 404 error
    if (!updated) {
      return next(errorHandler(404, "Menu item not found"));
    }

    // Respond with the updated menu item
    res.status(200).json(updated);
  } catch (err) {
    // Handle errors and return a 500 status if an error occurs during the update
    console.error(err);
    next(errorHandler(500, "Failed to update menu item"));
  }
};


// DELETE MENU ITEM
export const deleteMenuItem = async (req, res, next) => {
  try {
    // Attempt to find and delete the menu item by its ID
    const deleted = await MenuItem.findByIdAndDelete(req.params.menuId);

    // If no menu item was found, return a 404 error
    if (!deleted) {
      return next(errorHandler(404, "Menu item not found"));
    }

    // Respond with a success message
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    // Log the error for debugging
    console.error(err);
    next(errorHandler(500, "Failed to delete menu item"));
  }
};

// Controller for toggling availability
export const toggleAvailability = async (req, res, next) => {
  try {
    const { menuId } = req.params; // Get the menu item ID from the URL parameter
    const { isAvailable } = req.body; // Get the new availability value from the request body

    // Find the menu item by its ID and update the availability (isAvailable)
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuId,
      { isAvailable }, // Update the availability field with the new value
      { new: true } // Return the updated document
    );

    if (!updatedMenuItem) {
      return next(errorHandler(404, "Menu item not found"));
    }

    // Return the updated menu item
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    next(errorHandler(500, "Failed to toggle availability"));
  }
};

