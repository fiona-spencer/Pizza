import Customer from "../models/customer.model.js";

// Create User function
export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Check if user already exists
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user without password
    const newUser = new Customer({
      name,
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with user data
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get User function
export const getUser = async (req, res, next) => {
  try {
    // We can retrieve the user by their email or id
    const { email, id } = req.params;

    let user;

    if (email) {
      user = await Customer.findOne({ email });
    } else if (id) {
      user = await Customer.findById(id);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data without password
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    next(err);
  }
};
