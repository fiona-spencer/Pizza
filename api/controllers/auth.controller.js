import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';  // ✅ Import error utility

// GOOGLE
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    if (!email || !name) return next(errorHandler(400, "Missing Google account info"));

    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password, ...rest } = user._doc;
      res.status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        role: 'owner'
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

      const { password, ...rest } = newUser._doc;
      res.status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        })
        .json(rest);
    }
  } catch (err) {
    next(errorHandler(500, "Google sign-in failed"));
  }
};

// REGISTER
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(errorHandler(400, "Name, email, and password are required"));

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(errorHandler(409, "Email already registered"));

    const hashed = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json("User registered");
  } catch (err) {
    next(errorHandler(500, "Registration failed"));
  }
};

// LOGIN
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(errorHandler(400, "Email and password are required"));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    const isCorrect = bcryptjs.compareSync(password, user.password);
    if (!isCorrect) return next(errorHandler(400, "Wrong password"));

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { password: pw, ...rest } = user._doc;

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }).status(200).json(rest);
  } catch (err) {
    next(errorHandler(500, "Login failed"));
  }
};
