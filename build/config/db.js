"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

console.log(process.env.NODE_ENV); // DATABASE CONNECTION

if (process.env.NODE_ENV === 'production') {
  module.exports = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
}

if (process.env.NODE_ENV === 'development') {
  module.exports = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
}

if (process.env.NODE_ENV === 'test') {
  module.exports = new _pg.Pool({
    connectionString: process.env.TEST_DATABASE_URL
  });
}