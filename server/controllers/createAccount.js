/* eslint-disable no-multi-spaces */
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
    // const user = users.find(userEmail => userEmail.email)
    const newId = (account.length + 1);
    const randomId = Math.floor(Math.random() * 1000) + 100;
    const random = Math.floor(Math.random() * 10000000) + 100;
    // eslint-disable-next-line template-curly-spacing
    const accountnumber = parseInt(`4000${  random  }${newId}`, 10);

    const accountData = {
      id: randomId + newId,
      accountNumber: accountnumber,
      createdOn: Date(),
      owner: req.user.id,
      type: req.body.type,
      status: 'active',
      balance: parseFloat('0'),
    };
    account.push(accountData);
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: accountData.accountNumber,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
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
    account.splice(accountToBeDeleted, 1);
    return res.status(200).json({
      status: 200,
      message: 'The bank account has been deleted successfully',
    });
  }
}

export default Account;
