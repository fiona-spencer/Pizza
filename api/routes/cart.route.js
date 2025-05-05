import express from 'express';
import {
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '../controllers/cart.controller.js';
const router = express.Router();
import { verifyToken } from '../utils/verifyUser.js';

router.get('/', getCart);
router.post('/', addCartItem);
router.put('/:itemId', verifyToken, updateCartItem);
router.delete('/item/:itemId',  verifyToken, deleteCartItem);
router.delete('/', verifyToken, clearCart);

export default router;
