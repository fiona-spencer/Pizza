import express from 'express';
import {getStoreStatus, saveStoreStatus, saveStoreHours} from '../controllers/store.controller.js'
const router = express.Router();


router.get('/openClose', getStoreStatus);
router.post('/openClose', saveStoreStatus);
router.post('/hours', saveStoreHours);


export default router;