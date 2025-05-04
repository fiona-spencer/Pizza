import express from 'express';
import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menu.controller.js';
import { verifyUser } from '../utils/verifyOwner.js';

const router = express.Router();

router.get('/:resturandId/menu', getMenu);
router.post('/:resturandId/menu', verifyUser, addMenuItem);
router.put('/:menuId', verifyUser, updateMenuItem);
router.delete('/:menuId', verifyUser, deleteMenuItem);

export default router;
