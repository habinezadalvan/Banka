import express from 'express';
import Users from '../controllers/users';

const router = express.Router();

router.post('/api/v2/auth/signup', Users.signup);
router.post('/api/v2/auth/signin', Users.login);

export default router;
