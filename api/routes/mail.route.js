import express from 'express';

import { sendContact, confirmOrder, readyOrder } from '../controllers/mail.controller.js';
const router = express.Router();



router.post('/sendContact', sendContact);
router.post('/confirm', confirmOrder);
router.post('/ready', readyOrder);

export default router;
