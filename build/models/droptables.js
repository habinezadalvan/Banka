"use strict";

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteQuery = "\n    DROP TABLE IF EXISTS users CASCADE;\n    DROP TABLE IF EXISTS accounts CASCADE;\n    DROP TABLE IF EXISTS transactions";

_db.default.query(deleteQuery).then(function () {
  console.log('Deleted tables successfully'); // pool.end();
}).catch(function (err) {
  console.log(err);
  process.exit(0);
});