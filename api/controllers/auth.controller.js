import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

// Utility: Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// GOOGLE SIGN-IN
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    if (!email || !name) {
      return next(errorHandler(400, 'Missing Google account info'));
    }

    let user = await User.findOne({ email });

    if (user) {
      const token = generateToken(user._id, user.role);
      const { password, ...rest } = user._doc;

      return res.status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .json(rest);
    }

    // Create new user with random password
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(randomPassword, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
      role: 'customer', // Default role is now 'customer'
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.role);
    const { password, ...rest } = newUser._doc;

    res.status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json(rest);

  } catch (err) {
    console.error('Google Auth Error:', err);
    next(errorHandler(500, 'Google sign-in failed'));
  }
};


// REGISTER
export const register = async (req, res, next) => {
  // console.log('Register Request Body:', req.body); // 🔍 Add this line

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return next(errorHandler(400, 'All fields (name, email, password, role) are required'));
  }

  const validRoles = ['customer', 'owner', 'admin'];
  if (!validRoles.includes(role)) {
    return next(errorHandler(400, 'Invalid role. Must be one of: customer, owner, or admin.'));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, 'Email already registered'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });

  } catch (err) {
    console.error('Register Error:', err);
    next(errorHandler(500, 'Registration failed'));
  }
};


// LOGIN
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'Email and password are required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, 'Invalid credentials'));
    }

    const token = generateToken(user._id, user.role);
    const { password: pw, ...rest } = user._doc;

    res.status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json(rest);

  } catch (err) {
    console.error('Login Error:', err);
    next(errorHandler(500, 'Login failed'));
  }
};
