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
var ValidateAccounts =
/*#__PURE__*/
function () {
  function ValidateAccounts() {
    _classCallCheck(this, ValidateAccounts);
  }

  _createClass(ValidateAccounts, null, [{
    key: "AccountsValidation",
    value: function AccountsValidation(accountData) {
      var Schema = {
        accountNumber: _joi.default.number(),
        status: _joi.default.valid('active', 'dormant', 'draft'),
        type: _joi.default.string().required().valid('savings', 'current')
      };
      var validationOptions = {
        abortEarly: false,
        allowUnknown: true
      };
      return _joi.default.validate(accountData, Schema, validationOptions);
    }
  }, {
    key: "patchValidation",
    value: function patchValidation(accountData) {
      var Schema = {
        status: _joi.default.string().required().valid('active', 'dormant', 'draft')
      };
      return _joi.default.validate(accountData, Schema);
    }
  }]);

  return ValidateAccounts;
}();

var _default = ValidateAccounts;
exports.default = _default;