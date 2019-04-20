/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
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
    const { error } = validation.AccountsValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const getAccounts = 'SELECT * FROM accounts';
    const { rows } = await pool.query(getAccounts);
    const random = Math.floor(Math.random() * 100000000000) + 100000;
    // eslint-disable-next-line template-curly-spacing
    const accountnumber = parseInt(`4000${  random  }${rows + 1}`, 10);

    const accountValues = {
      accountNumber: accountnumber,
      createdOn: Date(),
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
        accountNumber: results.accountNumber,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        type: results.type,
        openingBalance: results.balance,
      },
    });
  }

  // ACTIVATE OR DEACTIVE BANK ACCOUNT
  static activateDeactivateAccount(req, res) {
    const { error } = validation.patchValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    // verify if the account activate or deactive exist
    const enteredAcc = parseInt(req.params.accountNumber);
    const accountData = account.find(bankAcc => bankAcc.accountNumber === enteredAcc);
    if (!accountData) {
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
    if (req.user.type !== 'staff' || req.user.isAdmin !== 'true') {
      return res.status(401).json({
        status: 401,
        message: 'You are not allowed to perform this oparation!',
      });
    }
    accountData.status = req.body.status;
    return res.status(200).json({
      status: 200,
      data: {
        accountData: accountData.accountNumber,
        status: accountData.status,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        email: accountData.email,
        accountBalance: '0',
      },
    });
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
