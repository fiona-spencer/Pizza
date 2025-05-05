import Restaurant from '../models/restaurant.model.js';

// ALL RESTAURANTS

export const getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (err) {
        next(err);
    }
};

// GET RESTAURANT

export const getRestaurantById = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.status(200).json(restaurant);
    } catch (err) {
        next(err);
    }
};

// CREATE RESTAURANT

export const createRestaurant = async (req, res, next) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        next(err);
    }
};

// UPDATE RESTAURANT

export const updateRestaurant = async (req, res, next) => {
    try {
        const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE RESTAURANT

export const deleteRestaurant = async (req, res, next) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json("Restaurant deleted");
    } catch (err) {
        next(err);
    }
};
