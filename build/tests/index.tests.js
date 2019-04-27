"use strict";

var _db = _interopRequireDefault(require("../config/db"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

require("./signup.tests");

require("./login.tests");

require("./accounts.tests");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable  */
_bcrypt.default.hash("12345", 10).then(function (pwd) {
  var users = 'INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6),($7, $8, $9, $10, $11, $12),($13, $14, $15, $16, $17, $18)';
  var values = ["adminfirstname", "adminname", "admin@gmail.com", "".concat(pwd), "staff", "true", "stafffirstname", "stafflastname", "staff@gmail.com", "".concat(pwd), "staff", "false", "userfirstname", "userlastname", "user@gmail.com", "".concat(pwd), "client", "false"];

  _db.default.query(users, values);
});