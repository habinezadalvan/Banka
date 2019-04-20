import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool from '../config/db';

dotenv.config();

bcrypt.hash(process.env.ADMINPASSWORD, 10).then((hash) => {
  const adminValues = {
    firstName: 'Admin',
    lastName: 'admin',
    email: 'admin@gmail.com',
    password: hash,
    type: 'staff',
    isAdmin: 'true',
  };

  const queryText = 'INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6)';
  pool.query(queryText, [adminValues.firstName,
    adminValues.lastName,
    adminValues.email,
    adminValues.password,
    adminValues.type,
    adminValues.isAdmin]);
});
