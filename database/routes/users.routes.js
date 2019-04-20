import express from 'express';
import Users from '../controllers/users';
// import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v2/auth/signup', Users.signup);

export default router;
