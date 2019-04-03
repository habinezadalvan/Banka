import transactions from '../models/transactions';
import validation from '../helpers/transactions';
import account from '../models/account';


class Transactions {
  // DEBIT BANK ACCOUNT
  static debitMethod(req, res) {
    // validating debit schema with joi
    const { error } = validation.debit(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    // check whether the account exists
    const accountData = account.find(bankAcc => bankAcc.accountNumber === (req.params.accountNumber));
    if (!accountData) {
      return res.status(404).json({
        status: 404,
        message: 'The account number you are trying to debit from does not exist',
      });
    }
    // check whether the account has sufficient amount of money
    if (accountData.openingBalance < req.body.amount) {
      return res.status(400).json({
        status: 400,
        message: 'The amount on the account are less than what you are debiting',
      });
    }
    const remainder = (accountData.openingBalance - req.body.amount);

    const newTransactionId = (transactions.length + 1);
    const debitData = {
      transactionId: newTransactionId,
      accountNumber: req.params.accountNumber,
      amount: req.body.amount,
      cashier: req.body.cashier,
      transactionType: 'debit',
      accountBalance: remainder,
    };
    // new account balance
    accountData.openingBalance = debitData.accountBalance;
    account.push(accountData);
    // create a debit transaction
    transactions.push(debitData);
    return res.status(201).json({
      status: 201,
      data: debitData,
    });
  }
}

export default Transactions;
