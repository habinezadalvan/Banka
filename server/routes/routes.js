import express from 'express';
import SignUp from '../controllers/signup';
import Login from '../controllers/login';
import Account from '../controllers/createAccount';
import Transactions from '../controllers/transactions';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/api/v1/users', auth, SignUp.getUsers);
router.get('/api/v1/accounts', auth, Account.getAllCounts);
router.get('/api/v1/transactions', auth, Transactions.getAllTransactions);
router.post('/api/v1/auth/signup', SignUp.signup);
router.post('/api/v1/auth/signin', Login.login);
router.post('/api/v1/accounts', auth, Account.createBankAccount);
router.post('/api/v1/transactions/:accountNumber/credit', auth, Transactions.creditMethod);
router.post('/api/v1/transactions/:accountNumber/debit', auth, Transactions.debitMethod);
router.patch('/api/v1/account/:accountNumber', auth, Account.activateDeactivateAccount);
router.delete('/api/v1/account/:accountNumber', auth, Account.deleteAccount);


export default router;
