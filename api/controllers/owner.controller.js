import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import Owner from '../models/owner.model.js';

// Test route for owner API
export const test = (req, res) => {
    res.json({ message: 'Owner API is Working' });
};

// UPDATE OWNER
export const updateOwner = async (req, res, next) => {
    const { ownerId } = req.params;  // Extract ownerId from URL
    const { email, password } = req.body;  // Get email and password from request body

    // Hash the password if it's provided in the request
    if (password) {
        if (password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = await bcrypt.hash(password, 10);
    }

    try {
        // Check if the owner exists
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return next(errorHandler(404, 'Owner not found'));
        }

        // Update the owner
        const updatedOwner = await Owner.findByIdAndUpdate(
            ownerId,
            {
                $set: {
                    email: email || owner.email,  // Only update if new email is provided
                    password: req.body.password || owner.password,  // Only update if new password is provided
                },
            },
            { new: true }
        );

        // Remove the password before sending the response
        const { password: _, ...rest } = updatedOwner._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// DELETE OWNER
export const deleteOwner = async (req, res, next) => {
    if (!req.owner.isAdmin && req.user.id !== req.params.ownerId) {
        return next(errorHandler(403, 'You are not allowed to delete this owner'));
    }

    try {
        // Check if the owner exists
        const owner = await Owner.findById(req.params.ownerId);
        if (!owner) {
            return next(errorHandler(404, 'Owner not found'));
        }

        await Owner.findByIdAndDelete(req.params.ownerId);
        res.status(200).json('Owner has been deleted');
    } catch (error) {
        next(error);
    }
};

// SIGNOUT
export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
};

// GET OWNER
export const getOwner = async (req, res, next) => {
    const ownerId = req.params.ownerId;  // Extract the ownerId from the URL
    try {
        const owner = await Owner.findById(ownerId);  // Query using the ownerId
        if (!owner) {
            return next(errorHandler(404, 'Owner not found'));
        }
        const { password, ...rest } = owner._doc;  // Exclude the password from the response
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
