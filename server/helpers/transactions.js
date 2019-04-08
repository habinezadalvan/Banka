import Joi from 'joi';

class TransactionsValidation {
  // debit validation
  static debit(debitData) {
    const Schema = {
      amount: Joi.number().required(),
      cashier: Joi.number().required(),
    };
    return Joi.validate(debitData, Schema);
  }

  // credit validation
  static credit(creditData) {
    const Schema = {
      amount: Joi.number().required(),
      cashier: Joi.number().required(),
    };
    return Joi.validate(creditData, Schema);
  }
}


export default TransactionsValidation;
