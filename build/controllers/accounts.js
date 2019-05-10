"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _db = _interopRequireDefault(require("../config/db"));

var _accounts = _interopRequireDefault(require("../helpers/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Account =
/*#__PURE__*/
function () {
  function Account() {
    _classCallCheck(this, Account);
  }

  _createClass(Account, null, [{
    key: "createBankAccount",
    // CREATE BANK ACCOUNT
    value: function () {
      var _createBankAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validation$AccountsV, error, responseError, getAccounts, _ref, rows, random, accountnumber, accountValues, queryText;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _validation$AccountsV = _accounts.default.AccountsValidation(req.body), error = _validation$AccountsV.error;

                if (!error) {
                  _context.next = 6;
                  break;
                }

                responseError = [];
                error.details.map(function (e) {
                  responseError.push({
                    message: e.message
                  });
                });
                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: responseError
                }));

              case 6:
                if (!(req.user.type !== 'client')) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'You are not allowed to perform this oparation!'
                }));

              case 8:
                if (!(req.user.type === 'client')) {
                  _context.next = 21;
                  break;
                }

                getAccounts = 'SELECT * FROM accounts';
                _context.next = 12;
                return _db.default.query(getAccounts);

              case 12:
                _ref = _context.sent;
                rows = _ref.rows;
                random = Math.floor(Math.random() * 10000000) + 100;
                accountnumber = parseInt("4000".concat(random).concat(rows + 1), 10);
                accountValues = {
                  accountNumber: accountnumber,
                  createdOn: (0, _moment.default)().format('LL'),
                  owner: req.user.id,
                  type: req.body.type,
                  status: 'active',
                  balance: parseFloat(0)
                };
                queryText = 'INSERT INTO accounts (accountnumber, createdon, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6)';
                _context.next = 20;
                return _db.default.query(queryText, [accountValues.accountNumber, accountValues.createdOn, accountValues.owner, accountValues.type, accountValues.status, accountValues.balance]);

              case 20:
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    accountNumber: accountValues.accountNumber,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    email: req.user.email,
                    type: accountValues.type,
                    openingBalance: accountValues.balance
                  }
                }));

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 23]]);
      }));

      function createBankAccount(_x, _x2) {
        return _createBankAccount.apply(this, arguments);
      }

      return createBankAccount;
    }() // ACTIVATE OR DEACTIVE BANK ACCOUNT

  }, {
    key: "activateDeactivateAccount",
    value: function () {
      var _activateDeactivateAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validation$patchVali, error, getAccount, enteredAcc, _ref2, rows, queryText, values;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _validation$patchVali = _accounts.default.patchValidation(req.body), error = _validation$patchVali.error;

                if (!error) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  error: error.details[0].message
                }));

              case 4:
                if (!isNaN(req.params.accountNumber)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'Sorry the account number do not exist or is not an integer'
                }));

              case 6:
                if (!(req.user.isadmin !== true)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Sorry you are not Authorized to perform this oparation!'
                }));

              case 8:
                getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
                enteredAcc = parseInt(req.params.accountNumber, 10);
                _context2.next = 12;
                return _db.default.query(getAccount, [enteredAcc]);

              case 12:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'The account you are trying to activate or deactivate do not exist'
                }));

              case 16:
                queryText = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
                values = [req.body.status, enteredAcc];
                _context2.next = 20;
                return _db.default.query(queryText, values);

              case 20:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  data: {
                    accountData: rows[0].accountnumber,
                    status: rows[0].status,
                    ownerId: rows[0].owner,
                    email: rows[0].email,
                    accountBalance: rows[0].balance
                  },
                  message: "The account has been updated to ".concat(req.body.status)
                }));

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 23]]);
      }));

      function activateDeactivateAccount(_x3, _x4) {
        return _activateDeactivateAccount.apply(this, arguments);
      }

      return activateDeactivateAccount;
    }() // DELETE A BANK ACCOUNT

  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var getAccount, enteredAcc, _ref3, rows, queryText;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (!(req.user.type !== 'staff')) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'You are not allowed to perform this oparation!'
                }));

              case 3:
                if (!(req.user.type === 'staff')) {
                  _context3.next = 19;
                  break;
                }

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
                  message: 'The account you are trying to Delete do not exist'
                }));

              case 12:
                if (!(rows[0].balance > 0)) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  status: 400,
                  message: "The account you are trying to delete has some amount on it and you can not delete an account with money, the amount is ".concat(rows[0].balance)
                }));

              case 14:
                if (!(rows[0].balance <= 0)) {
                  _context3.next = 19;
                  break;
                }

                queryText = 'DELETE FROM accounts WHERE accountnumber = $1';
                _context3.next = 18;
                return _db.default.query(queryText, [enteredAcc]);

              case 18:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'The bank account has been deleted successfully'
                }));

              case 19:
                _context3.next = 24;
                break;

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 21]]);
      }));

      function deleteAccount(_x5, _x6) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }() // VIEW ACCOUNT DETAILS BY USER

  }, {
    key: "getAccountDetails",
    value: function () {
      var _getAccountDetails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var accDetailsQueryText, _ref4, rows;

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
                  message: 'You are not allowed to perform this oparation!'
                }));

              case 3:
                if (!(req.user.type === 'client')) {
                  _context4.next = 12;
                  break;
                }

                accDetailsQueryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1';
                _context4.next = 7;
                return _db.default.query(accDetailsQueryText, [parseInt(req.params.accountNumber, 10)]);

              case 7:
                _ref4 = _context4.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry that Account does not exists'
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

      function getAccountDetails(_x7, _x8) {
        return _getAccountDetails.apply(this, arguments);
      }

      return getAccountDetails;
    }() // VIEW ALL ACCOUNTS OWNEE BY A SPECIFIC USER

  }, {
    key: "getAllUserAccounts",
    value: function () {
      var _getAllUserAccounts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var findEmail, _ref5, rows, innnerJoinQueryText, results;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                // Verify whether the account exists
                findEmail = 'SELECT * FROM users WHERE email = $1';
                _context5.next = 4;
                return _db.default.query(findEmail, [req.params.email.toLowerCase()]);

              case 4:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (rows[0]) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry that user does not exist'
                }));

              case 8:
                if (!(req.user.type !== 'staff')) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Sorry you are not authorized to perform this operation!'
                }));

              case 10:
                if (!(req.user.type === 'staff')) {
                  _context5.next = 18;
                  break;
                }

                innnerJoinQueryText = 'SELECT createdon, accountnumber, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE email = $1';
                _context5.next = 14;
                return _db.default.query(innnerJoinQueryText, [req.params.email.toLowerCase()]);

              case 14:
                results = _context5.sent;

                if (!(results.rows.length === 0)) {
                  _context5.next = 17;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry the user has no account!'
                }));

              case 17:
                return _context5.abrupt("return", res.status(200).json({
                  status: 200,
                  data: results.rows
                }));

              case 18:
                _context5.next = 23;
                break;

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 23:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 20]]);
      }));

      function getAllUserAccounts(_x9, _x10) {
        return _getAllUserAccounts.apply(this, arguments);
      }

      return getAllUserAccounts;
    }() // GET ALL ACCOUNTS

  }, {
    key: "getAllCounts",
    value: function () {
      var _getAllCounts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var queryText, _ref6, rows;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                if (!(req.user.type !== 'staff')) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'You are not allowed to perform this oparation!'
                }));

              case 3:
                queryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner';
                _context6.next = 6;
                return _db.default.query(queryText);

              case 6:
                _ref6 = _context6.sent;
                rows = _ref6.rows;

                if (!(rows.length === 0)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry! No bank account found'
                }));

              case 10:
                return _context6.abrupt("return", res.status(200).json({
                  status: 200,
                  data: rows
                }));

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 13]]);
      }));

      function getAllCounts(_x11, _x12) {
        return _getAllCounts.apply(this, arguments);
      }

      return getAllCounts;
    }() // GET ALL ACTIVE BANK ACCOUNTS

  }, {
    key: "getAllAccountsByStatus",
    value: function () {
      var _getAllAccountsByStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var queryText, value, _ref7, rows;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                if (!(req.user.type !== 'staff')) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Sorry you are not Authorized to perform this oparation!'
                }));

              case 3:
                queryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE status = $1';
                value = [req.query.status];
                _context7.next = 7;
                return _db.default.query(queryText, value);

              case 7:
                _ref7 = _context7.sent;
                rows = _ref7.rows;

                if (!(rows.length === 0)) {
                  _context7.next = 11;
                  break;
                }

                return _context7.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'Sorry! There is No such bank account found'
                }));

              case 11:
                return _context7.abrupt("return", res.status(200).json({
                  status: 200,
                  data: rows
                }));

              case 14:
                _context7.prev = 14;
                _context7.t0 = _context7["catch"](0);
                return _context7.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 14]]);
      }));

      function getAllAccountsByStatus(_x13, _x14) {
        return _getAllAccountsByStatus.apply(this, arguments);
      }

      return getAllAccountsByStatus;
    }()
  }]);

  return Account;
}();

var _default = Account;
exports.default = _default;