/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import account from '../models/account';
import validation from '../helpers/accounts';


class Account {
  // GET ALL ACCOUNTS
  static getAllCounts(erq, res) {
    const accountData = account;
    if (accountData.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No bank account found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: accountData,
    });
  }

  // CREATE BANK ACCOUNT
  static createBankAccount(req, res) {
    const { error } = validation.AccountsValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const newId = (account.length + 1);
    const accountnumber = (4000744000 + account.length);
    const accountData = {
      id: newId,
      accountNumber: accountnumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      type: req.body.type,
      status: 'active',
      balance: parseFloat('0'),
    };
    account.push(accountData);
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: accountData.accountNumber,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        email: accountData.email,
        type: accountData.type,
        openingBalance: accountData.balance,
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
    const accountData = account.find(bankAcc => bankAcc.accountNumber === parseInt(req.params.accountNumber));
    if (!accountData) {
      return res.status(404).json({
        status: 404,
        message: 'The account you are trying to activate or deactivate do not exist',
      });
    }
    // eslint-disable-next-line no-self-compare
    if (isNaN(req.params.accountNumber)) {
      return res.status(400).json({
        status: 400,
        message: 'The account number do not exist or is not an integer',
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
    const accountData = account.find(bankAcc => bankAcc.accountNumber === parseInt(req.params.accountNumber));
    if (!accountData) {
      return res.status(404).json({
        status: 404,
        message: 'The account you are trying to delete do not exist',
      });
    }
    // eslint-disable-next-line no-self-compare
    // if (isNaN(req.params.accountNumber)) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: 'The account number do not exist or is not an integer',
    //   });
    // }
    const accountToBeDeleted = account.indexOf(accountData);
    account.splice(accountToBeDeleted, 1);
    return res.status(200).json({
      status: 200,
      message: 'The bank account has been deleted successfully',
    });
  }
}

export default Account;
