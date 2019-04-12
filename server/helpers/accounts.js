import Joi from 'joi';

// validation for sign up
class ValidateAccounts {
  static AccountsValidation(accountData) {
    const Schema = {
      accountNumber: Joi.number(),
      status: Joi.valid('active', 'dormant', 'draft'),
      type: Joi.string().required(),
    };
    return Joi.validate(accountData, Schema);
  }

  static patchValidation(accountData) {
    const Schema = {
      status: Joi.string().required().valid('active', 'dormant'),
    };
    return Joi.validate(accountData, Schema);
  }
}

export default ValidateAccounts;
