import express from 'express';
import auth from '../middleware/auth';
import Transactions from '../controllers/transactions/view.transactions';
import credit from '../controllers/transactions/credit.transaction';
import debit from '../controllers/transactions/debit.transaction';

const router = express.Router();

router.post('/api/v2/transactions/:accountNumber/debit', auth.authorization, debit.debitMethod);
router.post('/api/v2/transactions/:accountNumber/credit', auth.authorization, credit.creditMethod);
router.get('/api/v2/accounts/:accountNumber/transactions', auth.authorization, Transactions.viewAllAccountTransactions);
router.get('/api/v2/transactions/:transactionId', auth.authorization, Transactions.getSpecificTransaction);


export default router;
