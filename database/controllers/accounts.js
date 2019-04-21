/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import moment from 'moment';
import pool from '../config/db';
import validation from '../../server/helpers/accounts';


class Account {
  // GET ALL ACCOUNTS
  static async getAllCounts(erq, res) {
    const queryText = 'SELECT * FROM accounts';
    const { rows } = await pool.query(queryText);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No bank account found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: rows,
    });
  }

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
      // eslint-disable-next-line template-curly-spacing
      const accountnumber = parseInt(`4000${  random  }${rows + 1}`, 10);

      const accountValues = {
        accountNumber: accountnumber,
        createdOn: moment().format('LL'),
        owner: req.user.id,
        type: req.body.type,
        status: 'active',
        balance: parseFloat('0'),
      };
      if (req.user.type !== 'client') {
        return res.status(401).json({
          status: 401,
          message: 'You are not allowed to perform this oparation!',
        });
      }
      const queryText = 'INSERT INTO accounts (accountnumber, createdon, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6)';
      const results = await pool.query(queryText, [accountValues.accountNumber,
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
      console.log(err);
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
      const enteredAcc = parseInt(req.params.accountNumber);
      const { rows } = await pool.query(getAccount, [enteredAcc]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'The account you are trying to activate or deactivate do not exist',
        });
      }
      // eslint-disable-next-line no-self-compare
      if ((isNaN(req.params.accountNumber))) {
        return res.status(400).json({
          status: 400,
          message: 'The account number do not exist or is not an integer',
        });
      }
      // if (req.user.type !== 'staff' || req.user.isadmin !== 'true') {
      //   return res.status(401).json({
      //     status: 401,
      //     message: 'You are not allowed to perform this oparation!',
      //   });
      // }
      const queryText = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
      const values = [req.body.status, enteredAcc];
      const results = await pool.query(queryText, values);

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
      console.log(err);
    }
  }

  // DELETE A BANK ACCOUNT
  static deleteAccount(req, res) {
    const enteredAcc = parseInt(req.params.accountNumber, 10);
    const accountData = account.find(bankAcc => bankAcc.accountNumber === enteredAcc);
    if (!accountData) {
      return res.status(404).json({
        status: 404,
        message: 'The account you are trying to delete do not exist',
      });
    }
    const accountToBeDeleted = account.indexOf(accountData);
    if (req.user.type !== 'staff' || req.user.isAdmin !== 'true') {
      return res.status(401).json({
        status: 401,
        message: 'You are not allowed to perform this oparation!',
      });
    }
    account.splice(accountToBeDeleted, 1);
    return res.status(200).json({
      status: 200,
      message: 'The bank account has been deleted successfully',
    });
  }
}

export default Account;
