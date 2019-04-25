import express from 'express';
import Users from '../controllers/users';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v2/auth/signup', Users.signup);
router.post('/api/v2/auth/signin', Users.login);
router.post('/api/v2/auth/staffaccount', auth.authorization, Users.createStaffAccount);

export default router;
