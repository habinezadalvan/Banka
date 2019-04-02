import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import login from '../models/login';
import validation from '../helpers/login';

dotenv.config();

// class for login endpoint
class Login {
  static login(req, res) {
    const { error } = validation.loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const newId = (login.length + 1);
    const newPassword = toString(req.body.password);
    const logindata = {
      id: newId,
      email: req.body.email,
      password: newPassword,
    };
    // sign up Authentication
    const token = jwt.sign({ id: logindata.id }, process.env.SECRETKEY);
    logindata.password = bcrypt.hash(logindata.password, 10);

    login.push(logindata);
    return res.status(201).json({
      status: 201,
      data: {
        token,
      },
      message: 'Welcome to Banka, you have successfully login',
    });
  }
}


export default Login;
