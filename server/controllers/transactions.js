/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
import moment from 'moment';
import transactions from '../models/transactions';
import validation from '../helpers/transactions';
import account from '../models/account';

class Transactions {
  static getAllTransactions(req, res) {
    if (transactions.length === 0) {
      res.status(404).json({
        status: 404,
        message: 'There is no transaction yet',
      });
    } else {
      res.status(200).json({
        status: 200,
        data: transactions,
      });
    }
  }

  // DEBIT BANK ACCOUNT
  static debitMethod(req, res) {
    // validating debit schema with joi
    const { error } = validation.debit(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const accountData = account.find(bankAcc => bankAcc.accountNumber === parseInt(req.params.accountNumber));
    if (!accountData) {
      res.status(400).json({
        status: 400,
        message: 'The account you are trying to debit from does not exists',
      });
    } else if (accountData.balance < parseFloat(req.body.amount)) {
      res.status(400).json({
        status: 400,
        message: `you have insufficient amount of balance and your balance is ${accountData.balance}`,
      });
    } else {
      const debitData = {
        transactionId: transactions.length + 1,
        createdOn: Date,
        accountNumber: req.params.accountNumber,
        cashier: req.body.cashierNumber,
        transactionType: 'debit',
        amount: parseFloat(req.body.amount),
        newBalance: accountData.balance - parseFloat(req.body.amount),
      };
      accountData.balance = debitData.newBalance;
      transactions.push(debitData);
      res.status(201).json({
        status: 201,
        data: debitData,
      });
    }
  }

  // CREDIT BANK ACCOUNT
  static creditMethod(req, res) {
    // validating debit schema with joi
    const { error } = validation.credit(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const accountData = account.find(bankAcc => bankAcc.accountNumber === parseInt(req.params.accountNumber));
    if (!accountData) {
      res.status(400).json({
        status: 400,
        message: 'The account you are trying to credit to does not exists',
      });
    } else {
      const creditData = {
        transactionId: transactions.length + 1,
        createdOn: Date,
        accountNumber: req.params.accountNumber,
        cashier: req.body.cashierNumber,
        transactionType: 'credit',
        amount: parseFloat(req.body.amount),
        oldBalance: accountData.balance,
        newBalance: accountData.balance + parseFloat(req.body.amount),
      };
      accountData.balance = creditData.newBalance;
      transactions.push(creditData);
      res.status(201).json({
        status: 201,
        data: creditData,
      });
    }
  }
}

export default Transactions;
