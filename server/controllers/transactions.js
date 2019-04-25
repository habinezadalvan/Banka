import moment from 'moment';
import mail from '@sendgrid/mail';
import pool from '../config/db';
import validation from '../helpers/transactions';

class Transactions {
  // DEBIT BANK ACCOUNT
  static async debitMethod(req, res) {
    try {
      // validating debit schema with joi
      const { error } = validation.debit(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
      }
      if (req.user.type !== 'staff' || req.user.isadmin === true) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry ou are not allowed to perform this operation!',
        });
      }
      if (req.user.type === 'staff' && req.user.isadmin === false) {
        // verify whether this account exists
        const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
        const enteredAcc = parseInt(req.params.accountNumber, 10);
        const { rows } = await pool.query(getAccount, [enteredAcc]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: 'The account you are trying to debit from does not exists',
          });
        } if (rows[0].balance < parseFloat(req.body.amount)) {
          return res.status(400).json({
            status: 400,
            message: `Sorry! you have insufficient amount of balance and your balance is ${rows[0].balance}`,
          });
        }
        const debitData = {
          createdOn: moment().format('LL'),
          type: 'debit',
          accountNumber: rows[0].accountnumber,
          cashier: req.user.id,
          amount: parseFloat(req.body.amount),
          oldBalance: (parseFloat(rows[0].balance) - parseFloat(req.body.amount))
        + parseFloat(req.body.amount),
          newBalance: parseFloat(rows[0].balance) - parseFloat(req.body.amount),
        };

        const updateAccount = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
        const values = [debitData.newBalance, enteredAcc];
        await pool.query(updateAccount, values);

        const debitquery = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1,$2,$3,$4,$5,$6,$7)';
        const results = await pool.query(debitquery, [debitData.createdOn,
          debitData.type,
          debitData.accountNumber,
          debitData.cashier,
          debitData.amount,
          debitData.oldBalance,
          debitData.newBalance]);

        //  DEBIT NOTIFICATION

        const queryText = 'SELECT * FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1;';
        const result = await pool.query(queryText, [enteredAcc]);
        console.log(result.rows[0].email);
        mail.setApiKey(process.env.SENDGRID_API_KEY);
        const message = {
          to: result.rows[0].email,
          from: 'bank@gmail.com',
          subject: 'Withdrwal message',
          html: `<strong>Thank you for using banka, the transaction has done successfully. You have credited ${debitData.amount} frw and now your account balance is ${debitData.newBalance} frw </strong>`,
        };
        mail.send(message);

        return res.status(201).json({
          status: 201,
          data: {
            transactionId: results.id,
            accountNumber: debitData.accountNumber,
            amount: debitData.amount,
            cashier: debitData.cashier,
            transactionType: debitData.type,
            accountBalance: debitData.newBalance,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // CREDIT BANK ACCOUNT
  static async creditMethod(req, res) {
    try {
      // validating debit schema with joi
      const { error } = validation.credit(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
      }
      if (req.user.type !== 'staff' || req.user.isadmin === true) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry ou are not allowed to perform this operation!',
        });
      }
      if (req.user.type === 'staff' && req.user.isadmin === false) {
        // verify whether this account exists
        const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
        const enteredAcc = parseInt(req.params.accountNumber, 10);
        const { rows } = await pool.query(getAccount, [enteredAcc]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: 'Sorry the account you are trying to credit to does not exists',
          });
        }
        const creditData = {
          createdOn: moment().format('LL'),
          type: 'credit',
          accountNumber: parseInt(rows[0].accountnumber, 10),
          cashier: req.user.id,
          amount: parseFloat(req.body.amount),
          oldBalance: parseFloat(rows[0].balance),
          newBalance: parseFloat(rows[0].balance) + parseFloat(req.body.amount),
        };

        const updateAccount = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
        const values = [creditData.newBalance, enteredAcc];
        await pool.query(updateAccount, values);

        const creditquery = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1,$2,$3,$4,$5,$6,$7)';
        const results = await pool.query(creditquery, [creditData.createdOn,
          creditData.type,
          creditData.accountNumber,
          creditData.cashier,
          creditData.amount,
          creditData.oldBalance,
          creditData.newBalance]);

        // CREDIT NOTIFICATION

        const queryText = 'SELECT * FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1;';
        const result = await pool.query(queryText, [enteredAcc]);
        mail.setApiKey(process.env.SENDGRID_API_KEY);
        const message = {
          to: result.rows[0].email,
          from: 'bank@gmail.com',
          subject: 'Deposit message',
          html: `<strong>Thank you for using banka, the transaction has done successfully. You have credited ${creditData.amount} frw and now your account balance is ${creditData.newBalance} frw </strong>`,
        };
        mail.send(message);

        return res.status(201).json({
          status: 201,
          data: {
            transactionId: results.id,
            accountNumber: creditData.accountNumber,
            amount: creditData.amount,
            cashier: creditData.cashier,
            transactionType: creditData.transactionType,
            accountBalance: creditData.newBalance,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // VIEW ALL ACCOUNT TRANSACTIONS
  static async viewAllAccountTransactions(req, res) {
    try {
      // verify whether this account exists
      const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
      const enteredAcc = parseInt(req.params.accountNumber, 10);
      const { rows } = await pool.query(getAccount, [enteredAcc]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry! the account you are trying to view its transactions does not exists',
        });
      }
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! You are not Authorized to perform this oparation!',
        });
      }
      const transctionQueryText = 'SELECT id, createdon, type, accountnumber, amount, oldbalance, newbalance  FROM transactions WHERE accountnumber = $1';
      const results = await pool.query(transctionQueryText, [enteredAcc]);
      if (results.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'There is no transaction yet!',
        });
      }
      return res.status(200).json({
        status: 200,
        data: results.rows, // Arrange them as in the guideline??
      });
    } catch (err) {
      console.log(err);
    }
  }

  // VIEW A SPECIFIC ACCOUNT TRANSACTION
  static async getSpecificTransaction(req, res) {
    try {
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! you are not Authorized to perform this oparation!',
        });
      }
      const transactionQueryText = 'SELECT id, createdon, type, accountnumber, amount, oldbalance, newbalance FROM transactions WHERE id = $1';
      const { rows } = await pool.query(transactionQueryText,
        [parseInt(req.params.transactionId, 10)]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry that transaction does not exists',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default Transactions;
