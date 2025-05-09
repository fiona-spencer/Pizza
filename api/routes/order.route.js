import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  archiveAllOrders
} from '../controllers/order.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createOrder', createOrder);
router.get('/getOrders', getOrders);
router.get('/:id', getOrderById);
router.patch('/update/:id' , updateOrderStatus);
router.delete('/:id', verifyToken, deleteOrder);
router.put('/archiveAllOrders', archiveAllOrders);



export default router;
