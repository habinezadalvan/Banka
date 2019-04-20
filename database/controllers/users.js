import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validationSignup from '../../server/helpers/signup';
import pool from '../config/db';

dotenv.config();

// class for signup endpoint
class Users {
  /*
  static getUsers(req, res) {
    if (req.user.type !== 'staff' || req.user.isAdmin !== 'true') {
      return res.status(401).json({
        status: 401,
        message: 'You are not allowed to perform this oparation!',
      });
    }
    const signedUsers = users;
    return res.status(200).json({
      status: 200,
      data: users,
    });
  }
*/

  static async signup(req, res) {
    const { error } = validationSignup.signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const findEmail = 'SELECT * from users WHERE email = $1';
    const email = [req.body.email.toLowerCase()];
    const { rows } = await pool.query(findEmail, email);

    if (rows.length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'The email you have entered already exists in the system, try another one!',
      });
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    let type;

    if (req.body.type === 'staff') {
      type = 'staff';
    } else {
      type = 'client';
    }
    let isAdmin;

    if (req.body.isAdmin === 'true') {
      isAdmin = 'true';
    } else {
      isAdmin = 'false';
    }
    if ((req.body.email.toLowerCase() !== 'admin@gmail.com') || (rows[0].isadmin !== 'true')) {
      type = 'client';
      isAdmin = 'false';
    }
    const signupValues = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      type,
      isAdmin,
    };
      // validate confirmPassword
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: 'Password and confirm password do not match!',
      });
    }
    const queryText = 'INSERT INTO users (firstname, lastname, email, password,type, isadmin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const results = await pool.query(queryText, [signupValues.firstName, signupValues.lastName, signupValues.email, signupValues.password, signupValues.type, signupValues.isAdmin]);

    // sign up Authentication
    const payload = {
      id: results.rows[0].id,
      firstName: results.rows[0].firstname,
      lastName: results.rows[0].lastname,
      email: results.rows[0].email,
      type: results.rows[0].type,
    };

    const token = jwt.sign(payload, process.env.SECRETKEY);

    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: results.rows[0].id,
        firstName: results.rows[0].firstname,
        lastName: results.rows[0].lastname,
        email: results.rows[0].email,
      },
    });
  }
}


export default Users;
