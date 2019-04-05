import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import signup from '../models/signup';
import validation from '../helpers/signup';

dotenv.config();

// class for signup endpoint
class SignUp {
  static getUsers(req, res) {
    const users = signup;
    res.status(200).json({
      status: 200,
      data: users,
    });
  }

  static signup(req, res) {
    const { error } = validation.signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const newId = (signup.length + 1);
    const newPassword = (req.body.password);
    let signupdata = signup.find(email => email.email === req.body.email);
    if (signupdata) {
      return res.status(201).json({
        status: 201,
        message: 'The email you have entered already exists in the system, try another one!',
      });
    }
    bcrypt.hash(newPassword, 10, (err, hash) => {
      signupdata = {
        id: newId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        // confirmPassword: req.body.confirmPassword,
        type: 'client',
      };
      // sign up Authentication
      const token = jwt.sign({ id: signupdata.id }, process.env.SECRETKEY);
      // validate confirmPassword
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(201).json({
          status: 201,
          message: 'Password and confirm password do not match!',
        });
      }
      signup.push(signupdata);
      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: signupdata.id,
          firstName: signupdata.firstName,
          lastName: signupdata.lastName,
          email: signupdata.email,
          password: hash,
        },
      });
    });
  }
}


export default SignUp;
