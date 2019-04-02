import express from 'express';
import SignUp from '../controllers/signup';
import Login from '../controllers/login';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v1/auth/signup', SignUp.signup);
router.post('/api/v1/auth/login', auth, Login.login);


export default router;
