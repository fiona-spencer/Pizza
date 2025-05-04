import Resturant from '../models/resturant.model.js';
import { errorHandler } from '../utils/error.js';

// GET ALL RESTAURANTS
export const getAllResturants = async (req, res, next) => {
  try {
    const resturants = await Resturant.find();
    if (!resturants.length) return next(errorHandler(404, "No restaurants found"));
    res.status(200).json(resturants);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch restaurants"));
  }
};

// GET RESTAURANT BY ID
export const getResturantById = async (req, res, next) => {
  try {
    const resturant = await Resturant.findById(req.params.id);
    if (!resturant) return next(errorHandler(404, "Restaurant not found"));
    res.status(200).json(resturant);
  } catch (err) {
    next(errorHandler(500, "Failed to fetch restaurant"));
  }
};

// CREATE RESTAURANT
export const createResturant = async (req, res, next) => {
  try {
    const newResturant = new Resturant(req.body);
    await newResturant.save();
    res.status(201).json(newResturant);
  } catch (err) {
    next(errorHandler(500, "Failed to create restaurant"));
  }
};

// UPDATE RESTAURANT
export const updateResturant = async (req, res, next) => {
  try {
    const updated = await Resturant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return next(errorHandler(404, "Restaurant not found"));
    res.status(200).json(updated);
  } catch (err) {
    next(errorHandler(500, "Failed to update restaurant"));
  }
};

// DELETE RESTAURANT
export const deleteResturant = async (req, res, next) => {
  try {
    const deleted = await Resturant.findByIdAndDelete(req.params.id);
    if (!deleted) return next(errorHandler(404, "Restaurant not found"));
    res.status(200).json("Restaurant deleted");
  } catch (err) {
    next(errorHandler(500, "Failed to delete restaurant"));
  }
};
