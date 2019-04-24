import express from 'express';
import auth from '../middleware/auth';
import Transactions from '../controllers/transactions';

const routers = express.Router();

routers.get('/api/v1/transactions', auth.authorization, Transactions.getAllTransactions);
routers.post('/api/v1/transactions/:accountNumber/credit', auth.authorization, Transactions.creditMethod);
routers.post('/api/v1/transactions/:accountNumber/debit', auth.authorization, Transactions.debitMethod);


export default routers;
