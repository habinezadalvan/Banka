
import moment from 'moment';
import pool from '../../config/db';
import validation from '../../helpers/accounts';

class Account {
  // CREATE BANK ACCOUNT
  static async createBankAccount(req, res) {
    try {
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      if (req.user.type === 'client') {
        const { error } = validation.AccountsValidation(req.body);
        if (error) {
          const responseError = [];
          error.details.map((e) => {
            responseError.push({ message: e.message });
          });

          return res.status(403).json({
            status: 403,
            error: responseError,
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
            firstName: req.user.firstname,
            lastName: req.user.lastname,
            email: req.user.email,
            type: accountValues.type,
            openingBalance: accountValues.balance,
          },
          message: `Thank you ${req.user.firstname} for choosing our Bank, you've successfully created a bank of the account number ${accountValues.accountNumber}. ENJOY THE BEST SERVICE!`,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // DELETE A BANK ACCOUNT
  static async deleteAccount(req, res) {
    try {
      if (req.user.type !== 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      if (req.user.type === 'staff') {
        if ((isNaN(req.params.accountNumber))) {
          return res.status(403).json({
            status: 403,
            message: 'Sorry the account number do not exist or is not an integer',
          });
        }
        const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
        const enteredAcc = parseInt(req.params.accountNumber, 10);
        const { rows } = await pool.query(getAccount, [enteredAcc]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: `This Acccount (${enteredAcc}) does not exist to be deleted`,
          });
        }
        if (rows[0].balance > 0) {
          return res.status(403).json({
            status: 403,
            message: `The account you are trying to delete has some amount on it and you can not delete an account with money, the amount is ${rows[0].balance}`,
          });
        }

        if (rows[0].balance <= 0) {
          const queryText = 'DELETE FROM accounts WHERE accountnumber = $1';
          await pool.query(queryText, [enteredAcc]);

          return res.status(200).json({
            status: 200,
            message: `The bank account (${enteredAcc}) has been deleted successfully`,
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }
}

export default Account;
