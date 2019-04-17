import Joi from 'joi';

// validation for sign up
class ValidateSignUp {
  static signupValidation(signupdata) {
    const Schema = {
      firstName: Joi.string().RegExp('/^[a-zA-Z]+$/').required(),
      lastName: Joi.string().RegExp('/^[a-zA-Z]+$/').required(),
      email: Joi.string().required().email().RegExp('/^[a-z]+$/'),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      type: Joi.string().valid('client', 'staff'),
      isAdmin: Joi.boolean(),
    };
    return Joi.validate(signupdata, Schema);
  }
}

export default ValidateSignUp;
