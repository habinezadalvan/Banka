"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // DATABASE CONNECTION


if (process.env.DEV_ENV === 'production') {
  module.exports = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
}

if (process.env.DEV_ENV === 'development') {
  module.exports = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
}

if (process.env.DEV_ENV === 'test') {
  module.exports = new _pg.Pool({
    connectionString: process.env.TEST_DATABASE_URL
  });
} else {
  var pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
  pool.on('connect', function () {
    console.log('App has connected to database successfully');
  });
  module.exports = pool;
}