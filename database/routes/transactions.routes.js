import express from 'express';
import auth from '../middleware/auth';
import Transactions from '../controllers/transactions';

const router = express.Router();

router.post('/api/v2/transactions/:accountNumber/debit', auth.authorization, Transactions.debitMethod);
router.post('/api/v2/transactions/:accountNumber/credit', auth.authorization, Transactions.creditMethod);
router.get('/api/v2/accounts/:accountNumber/transactions', auth.authorization, Transactions.viewAllAccountTransactions);
router.get('/api/v2/transactions/:transactionId', auth.authorization, Transactions.getSpecificTransaction);


export default router;
