import Joi from 'joi';

// validation for login up
class validateLogin {
  static loginValidation(logindata) {
    const Schema = {
      email: Joi.string().required().email().max(100),
      password: Joi.string().required(),
    };
    return Joi.validate(logindata, Schema);
  }
}

export default validateLogin;
