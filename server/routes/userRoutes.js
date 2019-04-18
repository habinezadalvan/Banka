import express from 'express';
import SignUp from '../controllers/signup';
import Login from '../controllers/login';
import auth from '../middleware/auth';

const routers = express.Router();

routers.post('/api/v1/auth/signup', SignUp.signup);
routers.post('/api/v1/auth/signin', Login.login);
routers.get('/api/v1/users', auth.authorization, SignUp.getUsers);

export default routers;
