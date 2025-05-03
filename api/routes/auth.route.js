import express from 'express';
import { google, signin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signin', signin);  // Sign in route
router.post('/google', google);  // Google sign-in route

export default router;
