import pool from '../config/db';


const createTables = `
            CREATE TABLE IF NOT EXISTS users(
                        id SERIAL PRIMARY KEY,
                        email VARCHAR(100) UNIQUE NOT NULL,
                        firstname VARCHAR(50) NOT NULL,
                        lastname VARCHAR(50) NOT NULL,
                        password VARCHAR(100) NOT NULL,
                        type VARCHAR(30),
                        isAdmin BOOLEAN
                    );

            CREATE TABLE IF NOT EXISTS accounts(
                    id SERIAL,
                    accountnumber NUMERIC PRIMARY KEY,
                    createdon TIMESTAMP,
                    owner INTEGER NOT NULL,
                    type VARCHAR(30) NOT NULL,
                    status VARCHAR(20) NOT NULL,
                    balance NUMERIC NOT NULL,
                    FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
                );

            CREATE TABLE IF NOT EXISTS transactions(
                id SERIAL PRIMARY KEY,
                createdon TIMESTAMP,
                type VARCHAR(20) NOT NULL,
                cashier INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                amount NUMERIC NOT NULL,
                oldbalance NUMERIC NOT NULL,
                newbalance NUMERIC NOT NULL,
                accountnumber NUMERIC REFERENCES accounts(accountnumber) ON DELETE CASCADE
            )`;

pool.query(createTables).then(() => {
  console.log('Successfully tables creation');
  pool.end();
}).catch((err) => {
  console.log(err);
  process.exit(0);
});

module.exports = pool;
