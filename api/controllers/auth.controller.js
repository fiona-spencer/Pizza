import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Owner from '../models/owner.model.js'; // Correcting to use 'Owner' model
import { errorHandler } from '../utils/error.js';

//  SIGNIN - customer

// POST /api/auth/signin
export const signInWithEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return next(errorHandler(400, 'A valid email is required.'));
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    next(errorHandler(500, 'Sign-in failed.'));
  }
};


// SIGNUP

export const signup = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newOwner = new Owner({
        email,
        password: hashedPassword,
    });

    try {
        await newOwner.save();
        res.status(201).json({ message: 'Signup successful' }); // Correct response
    } catch (error) {
        next(error);
    }
}

// SIGNIN - Owner

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validOwner = await Owner.findOne({ email });
        if (!validOwner) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validOwner.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign(
            { id: validOwner._id, isAdmin: validOwner.isAdmin }, // Correct the JWT payload
            process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = validOwner._doc;
        
        res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

// GOOGLE

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const owner = await Owner.findOne({ email });
        if (owner) {
            const token = jwt.sign(
                { 
                    id: owner._id,
                    isAdmin: owner.isAdmin,
                },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = owner._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword = 
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newOwner = new Owner({  // Correcting to use 'Owner' model
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newOwner.save();
            const token = jwt.sign(
                { id: newOwner._id, isAdmin: newOwner.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newOwner._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
