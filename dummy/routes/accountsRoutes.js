import express from 'express';
import auth from '../middleware/auth';
import Account from '../controllers/createAccount';


const routers = express.Router();

routers.post('/api/v1/accounts', auth.authorization, Account.createBankAccount);
routers.get('/api/v1/accounts', auth.authorization, Account.getAllCounts);
routers.patch('/api/v1/account/:accountNumber', auth.authorization, Account.activateDeactivateAccount);
routers.delete('/api/v1/account/:accountNumber', auth.authorization, Account.deleteAccount);


export default routers;
