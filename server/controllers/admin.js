import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool from '../config/db';

dotenv.config();

bcrypt.hash(process.env.ADMINPASSWORD, 10).then((hash) => {
  const adminValues = {
    firstName: 'Admin',
    lastName: 'admin',
    email: 'admin@gmail.com'.toLowerCase(),
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

bcrypt.hash(process.env.ADMINPASSWORD, 10).then((hash) => {
  const adminValues = {
    firstName: 'staff',
    lastName: 'staff',
    email: 'staff@gmail.com'.toLowerCase(),
    password: hash,
    type: 'staff',
    isAdmin: 'false',
  };
  const queryText = 'INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6)';
  pool.query(queryText, [adminValues.firstName,
    adminValues.lastName,
    adminValues.email,
    adminValues.password,
    adminValues.type,
    adminValues.isAdmin]);
});

console.log('admin and staff have been inserted in the database successfully');
