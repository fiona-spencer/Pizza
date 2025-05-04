import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyOwner.js';

const router = express.Router();

router.get('/:id', verifyUser, getUser);
router.put('/:id', verifyUser, updateUser);

export default router;
