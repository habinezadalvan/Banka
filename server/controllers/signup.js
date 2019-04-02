import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import signup from '../models/signup';
import validation from '../helpers/signup';

dotenv.config();

// class for signup endpoint
class SignUp {
  static signup(req, res) {
    const { error } = validation.signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const newId = (signup.length + 1);
    const newPassword = toString(req.body.password);
    const newConfirmPassword = toString(req.body.confirmPassword);

    let signupdata = signup.find(email => email.email === req.body.email);
    if (signupdata) {
      return res.status(400).json({
        status: 400,
        message: 'The email you have entered already exists in the system, try another one!',
      });
    }
    signupdata = {
      id: newId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: newPassword,
      confirmPassword: newConfirmPassword,
    };
    // sign up Authentication
    const token = jwt.sign({ id: signupdata.id }, process.env.SECRETKEY);
    signupdata.password = bcrypt.hash(signupdata.password, 10);

    // validate confirmPassword
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 400,
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
      },
    });
  }
}


export default SignUp;
