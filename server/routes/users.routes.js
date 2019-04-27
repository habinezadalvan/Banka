import express from 'express';
import signupController from '../controllers/users/signup';
import loginController from '../controllers/users/login';
import CreateStaff from '../controllers/users/create.staff.admin';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v2/auth/signup', signupController.signup);
router.post('/api/v2/auth/signin', loginController.login);
router.post('/api/v2/auth/staffaccount', auth.authorization, CreateStaff.createStaffAccount);

export default router;
