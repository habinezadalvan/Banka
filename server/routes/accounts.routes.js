import express from 'express';
import auth from '../middleware/auth';
import Accounts from '../controllers/accounts';

const router = express.Router();

router.get('/api/v2/accounts', auth.authorization, Accounts.getAllCounts);
router.post('/api/v2/accounts', auth.authorization, Accounts.createBankAccount);
router.patch('/api/v2/account/:accountNumber', auth.authorization, Accounts.activateDeactivateAccount);
router.delete('/api/v2/account/:accountNumber', auth.authorization, Accounts.deleteAccount);
router.get('/api/v2/accounts/:accountNumber', auth.authorization, Accounts.getAccountDetails);
router.get('/api/v2/:email/accounts', auth.authorization, Accounts.getAllUserAccounts);
router.get('/api/accounts', auth.authorization, Accounts.getAllAccountsByStatus);

export default router;
