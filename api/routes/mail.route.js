import express from 'express';

import { sendContact, confirmOrder } from '../controllers/mail.controller.js';
const router = express.Router();



router.post('/sendContact', sendContact);
router.post('/confirm', confirmOrder);

export default router;
