import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurant.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/getRest', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/createRestaurant', createRestaurant);
router.put('/:id',verifyToken, updateRestaurant);
router.delete('/:id', verifyToken, deleteRestaurant);

export default router;
