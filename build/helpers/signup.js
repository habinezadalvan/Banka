"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// validation for sign up
var ValidateSignUp =
/*#__PURE__*/
function () {
  function ValidateSignUp() {
    _classCallCheck(this, ValidateSignUp);
  }

  _createClass(ValidateSignUp, null, [{
    key: "signupValidation",
    value: function signupValidation(signupdata) {
      var Schema = {
        firstname: _joi.default.string().regex(/^[a-zA-Z]+$/).required().trim(),
        lastname: _joi.default.string().regex(/^[a-zA-Z]+$/).required().trim(),
        email: _joi.default.string().required().email({
          minDomainAtoms: 2
        }).trim(),
        password: _joi.default.string().required(),
        confirmpassword: _joi.default.string().required(),
        type: _joi.default.string().valid('client', 'staff'),
        isadmin: _joi.default.boolean()
      };
      var validationOptions = {
        abortEarly: false,
        // Allows it go through all
        allowUnknown: true // allow unknown keys that will be ignored

      };
      return _joi.default.validate(signupdata, Schema, validationOptions);
    }
  }]);

  return ValidateSignUp;
}();

var _default = ValidateSignUp;
exports.default = _default;