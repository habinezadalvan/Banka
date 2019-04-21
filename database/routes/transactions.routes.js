import express from 'express';
import auth from '../middleware/auth';
import Transactions from '../controllers/transactions';

const router = express.Router();

router.post('/api/v2/transactions/:accountNumber/debit', auth.authorization, Transactions.debitMethod);
router.post('/api/v2/transactions/:accountNumber/credit', auth.authorization, Transactions.creditMethod);
router.get('/api/v2/accounts/:accountNumber/transactions', auth.authorization, Transactions.viewAllAccountTransactions);
// router.post('/api/v2/accounts', auth.authorization, Accounts.createBankAccount);
// router.patch('/api/v2/account/:accountNumber', auth.authorization, Accounts.activateDeactivateAccount);
// router.delete('/api/v2/account/:accountNumber', auth.authorization, Accounts.deleteAccount);


export default router;
