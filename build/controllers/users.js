"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _signup2 = _interopRequireDefault(require("../helpers/signup"));

var _login2 = _interopRequireDefault(require("../helpers/login"));

var _db = _interopRequireDefault(require("../config/db"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config(); // USERS CLASS


var Users =
/*#__PURE__*/
function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: "signup",
    // SIGN UP
    value: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validationSignup$sig, error, findEmail, email, _ref, rows, hash, type, isadmin, signupValues, queryText, results, payload, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _validationSignup$sig = _signup2.default.signupValidation(req.body), error = _validationSignup$sig.error;

                if (!error) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: error.details[0].message
                }));

              case 4:
                findEmail = 'SELECT * from users WHERE email = $1';
                email = [req.body.email.toLowerCase()];
                _context.next = 8;
                return _db.default.query(findEmail, email);

              case 8:
                _ref = _context.sent;
                rows = _ref.rows;

                if (!(rows.length !== 0)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'Sorry the email you have entered already exists in the system, try another one!'
                }));

              case 12:
                hash = _bcrypt.default.hashSync(req.body.password, 10);

                if (req.body.type === 'staff') {
                  type = 'staff';
                } else {
                  type = 'client';
                }

                if (req.body.isadmin === 'true') {
                  isadmin = 'true';
                } else {
                  isadmin = 'false';
                }

                if (req.body.email.toLowerCase() !== 'admin@gmail.com'.toLowerCase() || rows[0].isadmin !== 'true') {
                  type = 'client';
                  isadmin = 'false';
                }

                signupValues = {
                  firstname: req.body.firstname.trim(),
                  lastname: req.body.lastname.trim(),
                  email: req.body.email.trim(),
                  password: hash,
                  type: type,
                  isadmin: isadmin
                }; // validate for confirmpassword

                if (!(req.body.password !== req.body.confirmpassword)) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'Password and confirm password do not match!'
                }));

              case 19:
                queryText = 'INSERT INTO users (firstname, lastname, email, password,type, isadmin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
                _context.next = 22;
                return _db.default.query(queryText, [signupValues.firstname, signupValues.lastname, signupValues.email, signupValues.password, signupValues.type, signupValues.isadmin]);

              case 22:
                results = _context.sent;
                // sign up Authentication
                payload = {
                  id: results.rows[0].id,
                  firstname: results.rows[0].firstname,
                  lastname: results.rows[0].lastname,
                  email: results.rows[0].email,
                  type: results.rows[0].type,
                  isadmin: results.rows[0].isadmin
                };
                token = _jsonwebtoken.default.sign(payload, process.env.SECRETKEY);
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    token: token,
                    id: results.rows[0].id,
                    firstname: results.rows[0].firstname,
                    lastname: results.rows[0].lastname,
                    email: results.rows[0].email
                  }
                }));

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server error'
                }));

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 28]]);
      }));

      function signup(_x, _x2) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }() // LOGIN OR SIGNIN

  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validationLogin$logi, error, newPassword, findEmail, email, _ref2, rows, truePassword, payload, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _validationLogin$logi = _login2.default.loginValidation(req.body), error = _validationLogin$logi.error;

                if (!error) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  error: error.details[0].message
                }));

              case 4:
                newPassword = req.body.password;
                findEmail = 'SELECT * FROM users WHERE email = $1';
                email = [req.body.email.toLowerCase()];
                _context2.next = 9;
                return _db.default.query(findEmail, email);

              case 9:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'INCORRECT EMAIL OR PASSWORD'
                }));

              case 13:
                truePassword = _bcrypt.default.compareSync(newPassword, rows[0].password);

                if (!truePassword) {
                  _context2.next = 18;
                  break;
                }

                // sign up Authentication
                payload = {
                  id: rows[0].id,
                  firstname: rows[0].firstname,
                  lastname: rows[0].lastname,
                  email: rows[0].email,
                  type: rows[0].type,
                  isadmin: rows[0].isadmin
                };
                token = _jsonwebtoken.default.sign(payload, process.env.SECRETKEY);
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  data: {
                    token: token,
                    id: rows[0].id,
                    firstname: rows[0].firstname,
                    lastname: rows[0].lastname,
                    email: rows[0].email
                  },
                  message: 'Welcome to Banka, you have successfully login'
                }));

              case 18:
                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'INCORRECT EMAIL OR PASSWORD'
                }));

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Server err'
                }));

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 21]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return Users;
}();

var _default = Users;
exports.default = _default;