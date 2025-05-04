import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Access denied. No token provided.'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Invalid or expired token'));

    req.user = user; // { id, role }
    next();
  });
};
