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

var TransactionsValidation =
/*#__PURE__*/
function () {
  function TransactionsValidation() {
    _classCallCheck(this, TransactionsValidation);
  }

  _createClass(TransactionsValidation, null, [{
    key: "debit",
    // debit validation
    value: function debit(debitData) {
      var Schema = {
        amount: _joi.default.number().required() // cashier: Joi.number().required(),

      };
      return _joi.default.validate(debitData, Schema);
    } // credit validation

  }, {
    key: "credit",
    value: function credit(creditData) {
      var Schema = {
        amount: _joi.default.number().required() // cashier: Joi.number().required(),

      };
      return _joi.default.validate(creditData, Schema);
    }
  }]);

  return TransactionsValidation;
}();

var _default = TransactionsValidation;
exports.default = _default;