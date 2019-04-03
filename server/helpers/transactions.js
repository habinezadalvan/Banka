import Joi from 'joi';

class TransactionsValidation {
  // debit validation
  static debit(debitData) {
    const Schema = {
      accountNumber: Joi.string(),
      amount: Joi.required(),
      cashier: Joi.number().required(),
      transactionType: Joi.string().valid('credit', 'debit'),
      accountBalance: Joi.string(),
    };
    return Joi.validate(debitData, Schema);
  }
}


export default TransactionsValidation;
