import account from '../models/account';
import validation from '../helpers/accounts';

// class for create account endpoint
class CreateAccount {
  static createBankAccount(req, res) {
    const { error } = validation.AccountsValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const newId = (account.length + 1);
    const accountData = {
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
}


export default CreateAccount;
