import express from 'express';
import SignUp from '../controllers/signup';

const router = express.Router();

router.post('/api/v1/auth/signup', SignUp.signup);


export default router;
