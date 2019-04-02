import Joi from 'joi';

// validation for sign up
class ValidateSignUp {
  static signupValidation(signupdata) {
    const Schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required().email().max(100),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    };
    return Joi.validate(signupdata, Schema);
  }
}

export default ValidateSignUp;
