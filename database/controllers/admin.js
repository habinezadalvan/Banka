/* eslint-disable max-len */
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
// import pool from '../config/db';

// dotenv.config();

// bcrypt.hash(process.env.ADMINPASSWORD, 10).then((hash) => {
//   const adminValues = {
//     firstName: 'Admin',
//     lastName: 'admin',
//     email: 'admin@gmail.com'.toLowerCase(),
//     password: hash,
//     type: 'staff',
//     isAdmin: 'true',
//   };
//   const payload = {
//     firstName: adminValues.firstName,
//     lastName: adminValues.lastName,
//     email: adminValues.email,
//     type: adminValues.type,
//   };
//   const token = jwt.sign(payload, process.env.SECRETKEY);

//   const queryText = 'INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6)';
//   pool.query(queryText, [adminValues.firstName,
//     adminValues.lastName,
//     adminValues.email,
//     adminValues.password,
//     adminValues.type,
//     adminValues.isAdmin]);
// });
