/* eslint-disable  */
import pool from '../config/db';
import bcrypt from 'bcrypt';
           

bcrypt.hash("12345", 10).then((pwd) => {
    const users = 'INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6),($7, $8, $9, $10, $11, $12),($13, $14, $15, $16, $17, $18)'
    const values = ["adminfirstname", "adminname", "admin@gmail.com", `${pwd}`, "staff", "true","stafffirstname", "stafflastname", "staff@gmail.com", `${pwd}`, "staff", "false","userfirstname", "userlastname", "user@gmail.com", `${pwd}`, "client", "false" ]          
    pool.query(users, values);
})

import './signup.tests';
import './login.tests';
import './accounts.tests';

