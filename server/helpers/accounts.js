import Joi from 'joi';

// validation for sign up
class ValidateAccounts {
  static AccountsValidation(accountData) {
    const Schema = {
      accountNumber: Joi.number().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required().email().max(100),
      type: Joi.string().required(),
      openingBalance: Joi.required(),
    };
    return Joi.validate(accountData, Schema);
  }

  static patchValidation(accountData) {
    const Schema = {
      status: Joi.string().required(),
    };
    return Joi.validate(accountData, Schema);
  }
}

export default ValidateAccounts;
