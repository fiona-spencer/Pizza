import express from 'express';
import {
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '../controllers/cart.controller.js';
import { verifyUser } from '../utils/verifyOwner.js';

const router = express.Router();

router.get('/', verifyUser, getCart);
router.post('/',  verifyUser, addCartItem);
router.put('/:itemId', verifyUser, updateCartItem);
router.delete('/item/:itemId',  verifyUser, deleteCartItem);
router.delete('/', verifyUser, clearCart);

export default router;
