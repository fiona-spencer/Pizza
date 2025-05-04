import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

// GET USER BY ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return next(errorHandler(404, "User not found"));
    res.status(200).json(user);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch user"));
  }
};

// UPDATE USER BY ID
export const updateUser = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
    
    if (!updated) return next(errorHandler(404, "User not found"));
    res.status(200).json(updated);
  } catch (err) {
    next(errorHandler(500, "Failed to update user"));
  }
};
