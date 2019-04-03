import express from 'express';
import SignUp from '../controllers/signup';
import Login from '../controllers/login';
import Account from '../controllers/createAccount';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v1/accounts', Account.createBankAccount);
router.patch('/api/v1/account/:accountNumber', Account.activateDeactivateAccount);

router.post('/api/v1/auth/signup', SignUp.signup);
router.post('/api/v1/auth/login', auth, Login.login);


export default router;
