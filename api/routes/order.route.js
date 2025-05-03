import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/createOrder', createOrder);       // Create order
router.get('/getOrders', getAllOrders);          // Get all orders
router.get('/getOrder/:email', getOrdersByEmail);  // Get orders by email
router.put('/update/:id', updateOrder);                // Update order
router.delete('/delete/:id', deleteOrder);             // Delete order

export default router;
