"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_bcrypt.default.hash(process.env.ADMINPASSWORD, 10).then(function (hash) {
  var adminValues = {
    firstName: 'Admin',
    lastName: 'admin',
    email: 'admin@gmail.com'.toLowerCase(),
    password: hash,
    type: 'staff',
    isAdmin: 'true'
  };
  var queryText = 'INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6)';

  _db.default.query(queryText, [adminValues.firstName, adminValues.lastName, adminValues.email, adminValues.password, adminValues.type, adminValues.isAdmin]);
});

_bcrypt.default.hash(process.env.ADMINPASSWORD, 10).then(function (hash) {
  var adminValues = {
    firstName: 'staff',
    lastName: 'staff',
    email: 'staff@gmail.com'.toLowerCase(),
    password: hash,
    type: 'staff',
    isAdmin: 'false'
  };
  var queryText = 'INSERT INTO users (firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6)';

  _db.default.query(queryText, [adminValues.firstName, adminValues.lastName, adminValues.email, adminValues.password, adminValues.type, adminValues.isAdmin]);
});

console.log('admin and staff have been inserted in the database successfully');