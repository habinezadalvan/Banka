import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/signup';
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
    const newId = (req.user);
    const newPassword = (req.body.password);
    let logindata = users.find(email => email.email === req.body.email);
    if (!logindata) {
      console.log(logindata);
      return res.status(400).json({
        status: 400,
        message: 'Your email is not yet in the system, You might not yet signed up',
      });
    }
    bcrypt.hash(newPassword, 10, (err, hash) => {
      logindata = {
        id: newId,
        firstName: logindata.firstName,
        lastName: logindata.lastName,
        email: req.body.email,
        password: hash,
      };
      // sign up Authentication
      const token = jwt.sign({ id: logindata.id }, process.env.SECRETKEY);
      users.push(logindata);
      return res.status(201).json({
        status: 201,
        data: {
          token,
          firstName: logindata.firstName,
          lastName: logindata.lastName,
          email: logindata.email,
        },
        message: 'Welcome to Banka, you have successfully login',
      });
    });
  }
}


export default Login;
