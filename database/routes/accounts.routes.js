import express from 'express';
import auth from '../middleware/auth';
import Accounts from '../controllers/accounts';

const router = express.Router();

router.get('/api/v2/accounts', auth.authorization, Accounts.getAllCounts);
router.post('/api/v2/accounts', auth.authorization, Accounts.createBankAccount);


export default router;
