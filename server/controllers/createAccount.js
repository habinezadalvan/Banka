import account from '../models/account';
import validation from '../helpers/accounts';


class Account {
  // CREATE BANK ACCOUNT
  static createBankAccount(req, res) {
    const { error } = validation.AccountsValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    let accountData = account.find(bankAcc => bankAcc.accountNumber === req.body.accountNumber);
    if (accountData) {
      return res.status(400).json({
        status: 400,
        message: 'The account you are trying to create already exist',
      });
    }
    const newId = (account.length + 1);
    accountData = {
      id: newId,
      accountNumber: req.body.accountNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      type: req.body.type,
      openingBalance: req.body.openingBalance,
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
        openingBalance: accountData.openingBalance,
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
    const accountData = account.find(bankAcc => bankAcc.accountNumber === (req.params.accountNumber));
    if (!accountData) {
      return res.status(404).json({
        status: 404,
        message: 'The account you are trying to activate or deactivate do not exist',
      });
    } if (accountData && accountData.status === 'active') {
      return res.status(200).json({
        status: 200,
        message: 'The account has been already activated',
      });
    }
    if (accountData && accountData.status === 'dormant') {
      return res.status(200).json({
        status: 200,
        message: 'The account has been already deactivated',
      });
    }
    accountData.status = req.body.status;
    return res.status(200).json({
      status: 200,
      accountNumber: {
        accountData: accountData.accountNumber,
        status: accountData.status,
      },
    });
  }
}

export default Account;
