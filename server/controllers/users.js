import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validationSignup from '../../dummy/helpers/signup';
import validationLogin from '../../dummy/helpers/login';
import pool from '../config/db';

dotenv.config();

// USERS CLASS
class Users {
  // SIGN UP
  static async signup(req, res) {
    try {
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
          message: 'Sorry the email you have entered already exists in the system, try another one!',
        });
      }
      const hash = bcrypt.hashSync(req.body.password, 10);
      let type;

      if (req.body.type === 'staff') {
        type = 'staff';
      } else {
        type = 'client';
      }
      let isadmin;

      if (req.body.isadmin === 'true') {
        isadmin = 'true';
      } else {
        isadmin = 'false';
      }
      if ((req.body.email.toLowerCase() !== 'admin@gmail.com'.toLowerCase()) || (rows[0].isadmin !== 'true')) {
        type = 'client';
        isadmin = 'false';
      }
      const signupValues = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        type,
        isadmin,
      };
      // validate for confirmpassword
      if (req.body.password !== req.body.confirmpassword) {
        return res.status(400).json({
          status: 400,
          message: 'Password and confirm password do not match!',
        });
      }
      const queryText = 'INSERT INTO users (firstname, lastname, email, password,type, isadmin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const results = await pool.query(queryText, [signupValues.firstname,
        signupValues.lastname,
        signupValues.email,
        signupValues.password,
        signupValues.type,
        signupValues.isadmin]);

      // sign up Authentication
      const payload = {
        id: results.rows[0].id,
        firstname: results.rows[0].firstname,
        lastname: results.rows[0].lastname,
        email: results.rows[0].email,
        type: results.rows[0].type,
        isadmin: results.rows[0].isadmin,
      };

      const token = jwt.sign(payload, process.env.SECRETKEY);

      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: results.rows[0].id,
          firstname: results.rows[0].firstname,
          lastname: results.rows[0].lastname,
          email: results.rows[0].email,
        },
      });
    } catch (err) {
      console.log();
    }
  }

  // LOGIN OR SIGNIN
  static async login(req, res) {
    try {
      const { error } = validationLogin.loginValidation(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
      }
      const newPassword = (req.body.password);
      const findEmail = 'SELECT * FROM users WHERE email = $1';
      const email = [req.body.email.toLowerCase()];
      const { rows } = await pool.query(findEmail, email);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'INCORRECT EMAIL OR PASSWORD',
        });
      }
      const truePassword = bcrypt.compareSync(newPassword, rows[0].password);
      if (truePassword) {
        // sign up Authentication
        const payload = {
          id: rows[0].id,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
          isadmin: rows[0].isadmin,
        };
        const token = jwt.sign(payload, process.env.SECRETKEY);
        return res.status(200).json({
          status: 200,
          data: {
            token,
            id: rows[0].id,
            firstname: rows[0].firstname,
            lastname: rows[0].lastname,
            email: rows[0].email,
          },
          message: 'Welcome to Banka, you have successfully login',
        });
      }
      return res.status(400).json({
        status: 400,
        message: 'INCORRECT EMAIL OR PASSWORD',
      });
    } catch (err) {
      console.log(err);
    }
  }
}


export default Users;
