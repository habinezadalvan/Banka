import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validationLogin from '../../helpers/login';
import pool from '../../config/db';
import '@babel/polyfill';

dotenv.config();

// LOGIN OR SIGNIN
const login = {
  async login(req, res) {
    try {
      const { error } = validationLogin.loginValidation(req.body);
      if (error) {
        if (error) {
          const responseError = [];
          error.details.map((err) => {
            responseError.push({ message: err.message });
          });
          return res.status(403).json({
            status: 403,
            error: responseError,
          });
        }
      }
      const newPassword = (req.body.password);
      const findEmail = 'SELECT * FROM users WHERE email = $1';
      const email = [req.body.email.toLowerCase()];
      const { rows } = await pool.query(findEmail, email);
      if (!rows[0]) {
        return res.status(403).json({
          status: 403,
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
            type: rows[0].type,
            isadmin: rows[0].isadmin,
          },
          message: 'Welcome to Banka, you have successfully login',
        });
      }
      return res.status(403).json({
        status: 403,
        message: 'INCORRECT EMAIL OR PASSWORD',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server err',
      });
    }
  },
};

export default login;
