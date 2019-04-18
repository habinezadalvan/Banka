import Joi from 'joi';

// validation for sign up
class ValidateSignUp {
  static signupValidation(signupdata) {
    const Schema = {
      firstName: Joi.string().regex(/^[a-zA-Z]+$/).required().trim(),
      lastName: Joi.string().regex(/^[a-zA-Z]+$/).required().trim(),
      email: Joi.string().required().email({minDomainAtoms: 2}).trim(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      type: Joi.string().valid('client', 'staff'),
      isAdmin: Joi.boolean(),
    };
    return Joi.validate(signupdata, Schema);
  }
}

export default ValidateSignUp;
