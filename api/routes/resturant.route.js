import express from 'express';
import {
  getAllResturants,
  getResturantById,
  createResturant,
  updateResturant,
  deleteResturant,
} from '../controllers/resturant.controller.js'
import { verifyUser } from '../utils/verifyOwner.js';

const router = express.Router();

router.get('/', getAllResturants);
router.get('/:id', getResturantById);
router.post('/', verifyUser, createResturant);
router.put('/:id',verifyUser, updateResturant);
router.delete('/:id', verifyUser, deleteResturant);

export default router;
