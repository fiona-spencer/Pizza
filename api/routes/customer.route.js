import express from "express";
import { createUser, getUser } from "../controllers/customer.controller.js"; // Import functions

const router = express.Router();

// Create a user
router.post("/register", createUser);

// Get a user by email or id
router.get("/user/:email", getUser); // Endpoint to get user by email
router.get("/user/id/:id", getUser); // Endpoint to get user by id

export default router;
