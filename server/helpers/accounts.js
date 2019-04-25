import Joi from 'joi';

// validation for sign up
class ValidateAccounts {
  static AccountsValidation(accountData) {
    const Schema = {
      accountNumber: Joi.number(),
      status: Joi.valid('active', 'dormant', 'draft'),
      type: Joi.string().required().valid('savings', 'current'),
    };
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
    };
    return Joi.validate(accountData, Schema, validationOptions);
  }

  static patchValidation(accountData) {
    const Schema = {
      status: Joi.string().required().valid('active', 'dormant', 'draft'),
    };
    return Joi.validate(accountData, Schema);
  }
}

export default ValidateAccounts;
