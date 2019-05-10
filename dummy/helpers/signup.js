import Joi from 'joi';

// validation for sign up
class ValidateSignUp {
  static signupValidation(signupdata) {
    const Schema = {
      firstname: Joi.string().regex(/^[a-zA-Z]+$/).required().trim(),
      lastname: Joi.string().regex(/^[a-zA-Z]+$/).required().trim(),
      email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
      password: Joi.string().required(),
      confirmpassword: Joi.string().required(),
      type: Joi.string().valid('client', 'staff'),
      isadmin: Joi.boolean(),
    };
    return Joi.validate(signupdata, Schema);
  }
}

export default ValidateSignUp;
