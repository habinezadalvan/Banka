"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _db = _interopRequireDefault(require("../config/db"));

var _transactions = _interopRequireDefault(require("../helpers/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transactions =
/*#__PURE__*/
function () {
  function Transactions() {
    _classCallCheck(this, Transactions);
  }

  _createClass(Transactions, null, [{
    key: "debitMethod",
    // DEBIT BANK ACCOUNT
    value: function () {
      var _debitMethod = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validation$debit, error, getAccount, enteredAcc, _ref, rows, debitData, updateAccount, values, debitquery, results, queryText, result, message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // validating debit schema with joi
                _validation$debit = _transactions.default.debit(req.body), error = _validation$debit.error;

                if (!error) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: error.details[0].message
                }));

              case 4:
                if (!(req.user.type !== 'staff' || req.user.isadmin === true)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Sorry ou are not allowed to perform this operation!'
                }));

              case 6:
                if (!(req.user.type === 'staff' && req.user.isadmin === false)) {
                  _context.next = 34;
                  break;
                }

                // verify whether this account exists
                getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
                enteredAcc = parseInt(req.params.accountNumber, 10);
                _context.next = 11;
                return _db.default.query(getAccount, [enteredAcc]);

              case 11:
                _ref = _context.sent;
                rows = _ref.rows;

                if (rows[0]) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'The account you are trying to debit from does not exists'
                }));

              case 15:
                if (!(rows[0].balance < parseFloat(req.body.amount))) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  message: "Sorry! you have insufficient amount of balance and your balance is ".concat(rows[0].balance)
                }));

              case 17:
                debitData = {
                  createdOn: (0, _moment.default)().format('LL'),
                  type: 'debit',
                  accountNumber: rows[0].accountnumber,
                  cashier: req.user.id,
                  amount: parseFloat(req.body.amount),
                  oldBalance: parseFloat(rows[0].balance) - parseFloat(req.body.amount) + parseFloat(req.body.amount),
                  newBalance: parseFloat(rows[0].balance) - parseFloat(req.body.amount)
                };
                updateAccount = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
                values = [debitData.newBalance, enteredAcc];
                _context.next = 22;
                return _db.default.query(updateAccount, values);

              case 22:
                debitquery = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1,$2,$3,$4,$5,$6,$7)';
                _context.next = 25;
                return _db.default.query(debitquery, [debitData.createdOn, debitData.type, debitData.accountNumber, debitData.cashier, debitData.amount, debitData.oldBalance, debitData.newBalance]);

              case 25:
                results = _context.sent;
                //  DEBIT NOTIFICATION
                queryText = 'SELECT * FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1;';
                _context.next = 29;
                return _db.default.query(queryText, [enteredAcc]);

              case 29:
                result = _context.sent;

                _mail.default.setApiKey(process.env.SENDGRID_API_KEY);

                message = {
                  to: result.rows[0].email,
                  from: 'bank@gmail.com',
                  subject: 'Withdrwal message',
                  html: "<strong>Thank you for using banka, the transaction has done successfully. You have credited ".concat(debitData.amount, " frw and now your account balance is ").concat(debitData.newBalance, " frw </strong>")
                };

                _mail.default.send(message);

                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    transactionId: results.id,
                    accountNumber: debitData.accountNumber,
                    amount: debitData.amount,
                    cashier: debitData.cashier,
                    transactionType: debitData.type,
                    accountBalance: debitData.newBalance
                  }
                }));

              case 34:
                _context.next = 39;
                break;

              case 36:
                _context.prev = 36;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 39:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 36]]);
      }));

      function debitMethod(_x, _x2) {
        return _debitMethod.apply(this, arguments);
      }

      return debitMethod;
    }() // CREDIT BANK ACCOUNT

  }, {
    key: "creditMethod",
    value: function () {
      var _creditMethod = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validation$credit, error, getAccount, enteredAcc, _ref2, rows, creditData, updateAccount, values, creditquery, results, queryText, result, message;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // validating debit schema with joi
                _validation$credit = _transactions.default.credit(req.body), error = _validation$credit.error;

                if (!error) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  error: error.details[0].message
                }));

              case 4:
                if (!(req.user.type !== 'staff' || req.user.isadmin === true)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Sorry ou are not allowed to perform this operation!'
                }));

              case 6:
                if (!(req.user.type === 'staff' && req.user.isadmin === false)) {
                  _context2.next = 32;
                  break;
                }

                // verify whether this account exists
                getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
                enteredAcc = parseInt(req.params.accountNumber, 10);
                _context2.next = 11;
                return _db.default.query(getAccount, [enteredAcc]);

              case 11:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry the account you are trying to credit to does not exists'
                }));

              case 15:
                creditData = {
                  createdOn: (0, _moment.default)().format('LL'),
                  type: 'credit',
                  accountNumber: parseInt(rows[0].accountnumber, 10),
                  cashier: req.user.id,
                  amount: parseFloat(req.body.amount),
                  oldBalance: parseFloat(rows[0].balance),
                  newBalance: parseFloat(rows[0].balance) + parseFloat(req.body.amount)
                };
                updateAccount = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
                values = [creditData.newBalance, enteredAcc];
                _context2.next = 20;
                return _db.default.query(updateAccount, values);

              case 20:
                creditquery = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1,$2,$3,$4,$5,$6,$7)';
                _context2.next = 23;
                return _db.default.query(creditquery, [creditData.createdOn, creditData.type, creditData.accountNumber, creditData.cashier, creditData.amount, creditData.oldBalance, creditData.newBalance]);

              case 23:
                results = _context2.sent;
                // CREDIT NOTIFICATION
                queryText = 'SELECT * FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1;';
                _context2.next = 27;
                return _db.default.query(queryText, [enteredAcc]);

              case 27:
                result = _context2.sent;

                _mail.default.setApiKey(process.env.SENDGRID_API_KEY);

                message = {
                  to: result.rows[0].email,
                  from: 'bank@gmail.com',
                  subject: 'Deposit message',
                  html: "<strong>Thank you for using banka, the transaction has done successfully. You have credited ".concat(creditData.amount, " frw and now your account balance is ").concat(creditData.newBalance, " frw </strong>")
                };

                _mail.default.send(message);

                return _context2.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    transactionId: results.id,
                    accountNumber: creditData.accountNumber,
                    amount: creditData.amount,
                    cashier: creditData.cashier,
                    transactionType: creditData.transactionType,
                    accountBalance: creditData.newBalance
                  }
                }));

              case 32:
                _context2.next = 37;
                break;

              case 34:
                _context2.prev = 34;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 37:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 34]]);
      }));

      function creditMethod(_x3, _x4) {
        return _creditMethod.apply(this, arguments);
      }

      return creditMethod;
    }() // VIEW ALL ACCOUNT TRANSACTIONS

  }, {
    key: "viewAllAccountTransactions",
    value: function () {
      var _viewAllAccountTransactions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var getAccount, enteredAcc, _ref3, rows, transctionQueryText, results;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (!(req.user.type !== 'client')) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Sorry! You are not Authorized to perform this oparation!'
                }));

              case 3:
                if (!(req.user.type === 'client')) {
                  _context3.next = 19;
                  break;
                }

                // verify whether this account exists
                getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
                enteredAcc = parseInt(req.params.accountNumber, 10);
                _context3.next = 8;
                return _db.default.query(getAccount, [enteredAcc]);

              case 8:
                _ref3 = _context3.sent;
                rows = _ref3.rows;

                if (rows[0]) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry! the account you are trying to view its transactions does not exists'
                }));

              case 12:
                transctionQueryText = 'SELECT id, createdon, type, accountnumber, amount, oldbalance, newbalance  FROM transactions WHERE accountnumber = $1';
                _context3.next = 15;
                return _db.default.query(transctionQueryText, [enteredAcc]);

              case 15:
                results = _context3.sent;

                if (!(results.rows.length === 0)) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'There is no transaction yet!'
                }));

              case 18:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  data: results.rows
                }));

              case 19:
                _context3.next = 25;
                break;

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 21]]);
      }));

      function viewAllAccountTransactions(_x5, _x6) {
        return _viewAllAccountTransactions.apply(this, arguments);
      }

      return viewAllAccountTransactions;
    }() // VIEW A SPECIFIC ACCOUNT TRANSACTION

  }, {
    key: "getSpecificTransaction",
    value: function () {
      var _getSpecificTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var transactionQueryText, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (!(req.user.type !== 'client')) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Sorry! you are not Authorized to perform this oparation!'
                }));

              case 3:
                if (!(req.user.type === 'client')) {
                  _context4.next = 12;
                  break;
                }

                transactionQueryText = 'SELECT id, createdon, type, accountnumber, amount, oldbalance, newbalance FROM transactions WHERE id = $1';
                _context4.next = 7;
                return _db.default.query(transactionQueryText, [parseInt(req.params.transactionId, 10)]);

              case 7:
                _ref4 = _context4.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry that transaction does not exists'
                }));

              case 11:
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  data: rows[0]
                }));

              case 12:
                _context4.next = 17;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 14]]);
      }));

      function getSpecificTransaction(_x7, _x8) {
        return _getSpecificTransaction.apply(this, arguments);
      }

      return getSpecificTransaction;
    }()
  }]);

  return Transactions;
}();

var _default = Transactions;
exports.default = _default;