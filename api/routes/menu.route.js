import express from 'express';
import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menu.controller.js';
const router = express.Router();

router.get('/getItems', getMenu);
router.post('/addItem', addMenuItem);
router.put('/:menuId', updateMenuItem);
router.delete('/:menuId', deleteMenuItem);

export default router;
