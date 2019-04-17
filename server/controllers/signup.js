/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/signup';
import validation from '../helpers/signup';

dotenv.config();

// class for signup endpoint
class SignUp {
  static getUsers(req, res) {
    const signedUsers = users;
    return res.status(200).json({
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
    const newId = (users.length + 1);
    const randomId = Math.floor(Math.random() * 1000) + 100;
    const newPassword = (req.body.password);
    let signupdata = users.find(email => email.email === req.body.email);
    if (signupdata) {
      return res.status(400).json({
        status: 400,
        message: 'The email you have entered already exists in the system, try another one!',
      });
    }
    const hash = bcrypt.hashSync(newPassword, 10);
    signupdata = {
      id: newId + randomId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      type: 'client',
      isAdmin: 'false',
    };
    // sign up Authentication
    const payload = {
      id: signupdata.id,
      firstName: signupdata.firstName,
      lastName: signupdata.lastName,
      email: signupdata.email,
      type: signupdata.type,
    };

    const token = jwt.sign(payload, process.env.SECRETKEY);
    // validate confirmPassword
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: 'Password and confirm password do not match!',
      });
    }
    users.push(signupdata);
    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: signupdata.id,
        firstName: signupdata.firstName,
        lastName: signupdata.lastName,
        email: signupdata.email,
        password: signupdata.password,
      },
    });
  }
}


export default SignUp;
