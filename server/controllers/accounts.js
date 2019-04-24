import moment from 'moment';
import pool from '../config/db';
import validation from '../../dummy/helpers/accounts';


class Account {
  // CREATE BANK ACCOUNT
  static async createBankAccount(req, res) {
    try {
      const { error } = validation.AccountsValidation(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
      }
      const getAccounts = 'SELECT * FROM accounts';
      const { rows } = await pool.query(getAccounts);
      const random = Math.floor(Math.random() * 10000000) + 100;
      const accountnumber = parseInt(`4000${  random  }${rows + 1}`, 10);

      const accountValues = {
        accountNumber: accountnumber,
        createdOn: moment().format('LL'),
        owner: req.user.id,
        type: req.body.type,
        status: 'active',
        balance: parseFloat(0),
      };
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: 403,
          message: 'You are not allowed to perform this oparation!',
        });
      }
      const queryText = 'INSERT INTO accounts (accountnumber, createdon, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6)';
      await pool.query(queryText, [accountValues.accountNumber,
        accountValues.createdOn,
        accountValues.owner,
        accountValues.type,
        accountValues.status,
        accountValues.balance]);

      return res.status(201).json({
        status: 201,
        data: {
          accountNumber: accountValues.accountNumber,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          type: accountValues.type,
          openingBalance: accountValues.balance,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // ACTIVATE OR DEACTIVE BANK ACCOUNT
  static async activateDeactivateAccount(req, res) {
    try {
      const { error } = validation.patchValidation(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
      }
      // verify if the account activate or deactive exist
      const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
      const enteredAcc = parseInt(req.params.accountNumber, 10);
      const { rows } = await pool.query(getAccount, [enteredAcc]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'The account you are trying to activate or deactivate do not exist',
        });
      }

      if ((isNaN(req.params.accountNumber))) {
        return res.status(400).json({
          status: 400,
          message: 'Sorry the account number do not exist or is not an integer',
        });
      }
      if (req.user.type !== 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry you are not Authorized to perform this oparation!',
        });
      }
      const queryText = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
      const values = [req.body.status, enteredAcc];
      await pool.query(queryText, values);

      return res.status(200).json({
        status: 200,
        data: {
          accountData: rows[0].accountnumber,
          status: rows[0].status,
          ownerId: rows[0].owner,
          email: rows[0].email,
          accountBalance: rows[0].balance,
        },
        message: 'The account has been updated',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // DELETE A BANK ACCOUNT
  static async deleteAccount(req, res) {
    try {
      const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
      const enteredAcc = parseInt(req.params.accountNumber, 10);
      const { rows } = await pool.query(getAccount, [enteredAcc]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'The account you are trying to Delete do not exist',
        });
      }

      if (req.user.type !== 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'You are not allowed to perform this oparation!',
        });
      }
      const queryText = 'DELETE FROM accounts WHERE accountnumber = $1';
      await pool.query(queryText, [enteredAcc]);

      return res.status(200).json({
        status: 200,
        message: 'The bank account has been deleted successfully',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // VIEW ACCOUNT DETAILS BY USER
  static async getAccountDetails(req, res) {
    try {
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: 403,
          message: 'You are not allowed to perform this oparation!',
        });
      }
      const accDetailsQueryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1';
      const { rows } = await pool.query(accDetailsQueryText,
        [parseInt(req.params.accountNumber, 10)]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry that Account does not exists',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // VIEW ALL ACCOUNTS OWNEE BY A SPECIFIC USER
  static async getAllUserAccounts(req, res) {
    try {
      // Verify whether the account exists
      const findEmail = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(findEmail, [req.params.email.toLowerCase()]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry that user does not exist',
        });
      }
      if (req.user.type !== 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry you are not authorized to perform this operation!',
        });
      }
      const innnerJoinQueryText = 'SELECT createdon, accountnumber, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE email = $1';
      const results = await pool.query(innnerJoinQueryText, [req.params.email.toLowerCase()]);

      if (results.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry the user has no account!',
        });
      }
      return res.status(200).json({
        status: 200,
        data: results.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // GET ALL ACCOUNTS
  static async getAllCounts(req, res) {
    try {
      if (req.user.type !== 'staff') {
        // console.log(req.user);
        return res.status(403).json({
          status: 403,
          message: 'You are not allowed to perform this oparation!',
        });
      }
      const queryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner';
      const { rows } = await pool.query(queryText);

      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry! No bank account found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // GET ALL ACTIVE BANK ACCOUNTS
  static async getAllAccountsByStatus(req, res) {
    try {
      if (req.user.type !== 'staff') {
        // console.log(req.user);
        return res.status(403).json({
          status: 403,
          message: 'Sorry you are not Authorized to perform this oparation!',
        });
      }
      const queryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE status = $1';
      const value = [req.query.status];
      const { rows } = await pool.query(queryText, value);
      // console.log(rows);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry! There is No such bank account found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }
}

export default Account;
