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

// validation for login up
var validateLogin =
/*#__PURE__*/
function () {
  function validateLogin() {
    _classCallCheck(this, validateLogin);
  }

  _createClass(validateLogin, null, [{
    key: "loginValidation",
    value: function loginValidation(logindata) {
      var Schema = {
        email: _joi.default.string().required().email().trim(),
        password: _joi.default.string().required()
      };
      var validationOptions = {
        abortEarly: false,
        allowUnknown: true
      };
      return _joi.default.validate(logindata, Schema, validationOptions);
    }
  }]);

  return validateLogin;
}();

var _default = validateLogin;
exports.default = _default;