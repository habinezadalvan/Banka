import express from 'express';
import auth from '../middleware/auth';
import Accounts from '../controllers/accounts/create.delete.account';
import ViewAccounts from '../controllers/accounts/view.specific.accounts';
import viewAllAccounts from '../controllers/accounts/view.all.accounts';
import patch from '../controllers/accounts/activate.deactivateAcc';

const router = express.Router();

router.get('/api/v2/accounts', auth.authorization, viewAllAccounts.getAllCounts);
router.post('/api/v2/accounts', auth.authorization, Accounts.createBankAccount);
router.patch('/api/v2/account/:accountNumber', auth.authorization, patch.activateDeactivateAccount);
router.delete('/api/v2/account/:accountNumber', auth.authorization, Accounts.deleteAccount);
router.get('/api/v2/accounts/:accountNumber', auth.authorization, ViewAccounts.getAccountDetails);
router.get('/api/v2/:email/accounts', auth.authorization, ViewAccounts.getAllUserAccounts);
router.get('/api/accounts', auth.authorization, viewAllAccounts.getAllAccountsByStatus);

export default router;
