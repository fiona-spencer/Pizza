import express from 'express';
import { 
    deleteOwner, 
    getOwner, 
    signout, 
    updateOwner, 
    test 
} from '../controllers/owner.controller.js';

import { verfiyToken } from '../utils/verifyOwner.js';

const router = express.Router();

router.get('/test', test);  // OK
router.put('/update/:ownerId', verfiyToken, updateOwner);  // OK
router.delete('/delete/:ownerId', verfiyToken, deleteOwner);  // OK
router.post('/signout', signout);  // OK
router.get('/:ownerId', getOwner);  // OK

export default router;
