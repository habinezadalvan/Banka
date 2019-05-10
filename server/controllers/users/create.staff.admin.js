import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validationSignup from '../../helpers/signup';
import pool from '../../config/db';
import '@babel/polyfill';

dotenv.config();

// USERS CLASS
class CreateStaff {
  // ADMIN CREATES STAFF ACCOUNT
  static async createStaffAccount(req, res) {
    try {
      if (req.user.isadmin !== true) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! you are not allowed to perform this operation, it is only for ADMIN',
        });
      }
      if (req.user.isadmin === true) {
        const { error } = validationSignup.signupValidation(req.body);
        if (error) {
          const responseError = [];
          error.details.map((e) => {
            responseError.push({ message: e.message });
          });

          return res.status(403).json({
            status: 403,
            error: responseError,
          });
        }
        const findEmail = 'SELECT * from users WHERE email = $1';
        const email = [req.body.email.toLowerCase()];
        const { rows } = await pool.query(findEmail, email);

        if (rows.length !== 0) {
          return res.status(409).json({
            status: 409,
            message: 'Sorry! That email has been already used, try another one!',
          });
        }
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newStaffValues = {
          firstname: req.body.firstname.trim(),
          lastname: req.body.lastname.trim(),
          email: req.body.email.trim().toLowerCase(),
          password: hash,
          type: 'staff',
          isadmin: req.body.isadmin,
        };
        // validate for confirmpassword
        if (req.body.password !== req.body.confirmpassword) {
          return res.status(400).json({
            status: 400,
            message: 'Password and confirm password do not match!',
          });
        }
        const queryText = 'INSERT INTO users (firstname, lastname, email, password,type, isadmin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        const results = await pool.query(queryText, [newStaffValues.firstname,
          newStaffValues.lastname,
          newStaffValues.email,
          newStaffValues.password,
          newStaffValues.type,
          newStaffValues.isadmin]);

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
            type: results.rows[0].type,
            isadmin: results.rows[0].isadmin,
          },
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }
}


export default CreateStaff;
