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
    const newPassword = (req.body.password);
    let logindata = users.find(email => email.email.toLowerCase() === req.body.email.toLowerCase());
    if (!logindata) {
      return res.status(400).json({
        status: 400,
        message: 'INCORRECT EMAIL OR PASSWORD',
      });
    }
    const truePassword = bcrypt.compareSync(newPassword, logindata.password);
    if (truePassword) {
      logindata = {
        id: logindata.id,
        firstname: logindata.firstname,
        lastname: logindata.lastname,
        email: req.body.email,
        password: truePassword,
      };
      // sign up Authentication
      const payload = {
        id: logindata.id,
        firstname: logindata.firstname,
        lastname: logindata.lastname,
        email: logindata.email,
        type: logindata.type,
      };

      const token = jwt.sign(payload, process.env.SECRETKEY);
      users.push(logindata);
      return res.status(200).json({
        status: 200,
        data: {
          token,
          id: logindata.id,
          firstname: logindata.firstname,
          lastname: logindata.lastname,
          email: logindata.email,
        },
        message: 'Welcome to Banka, you have successfully login',
      });
    }
    return res.status(400).json({
      status: 400,
      message: 'INCORRECT EMAIL OR PASSWORD',
    });
  }
}


export default Login;
