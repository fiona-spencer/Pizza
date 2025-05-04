import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller.js';
import { verifyUser } from '../utils/verifyOwner.js';

const router = express.Router();

router.post('/', verifyUser, createOrder);
router.get('/', verifyUser, getOrders);
router.get('/:id', verifyUser, getOrderById);
router.put('/:id/status', verifyUser, updateOrderStatus);

export default router;
