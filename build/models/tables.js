"use strict";

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTables = "\n            CREATE TABLE IF NOT EXISTS users(\n                        id SERIAL PRIMARY KEY,\n                        email VARCHAR(100) UNIQUE NOT NULL,\n                        firstname VARCHAR(50) NOT NULL,\n                        lastname VARCHAR(50) NOT NULL,\n                        password VARCHAR(100) NOT NULL,\n                        type VARCHAR(30),\n                        isAdmin BOOLEAN\n                    );\n\n            CREATE TABLE IF NOT EXISTS accounts(\n                    id SERIAL,\n                    accountnumber NUMERIC PRIMARY KEY,\n                    createdon TIMESTAMP,\n                    owner INTEGER NOT NULL,\n                    type VARCHAR(30) NOT NULL,\n                    status VARCHAR(20) NOT NULL,\n                    balance NUMERIC NOT NULL,\n                    FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE\n                );\n\n            CREATE TABLE IF NOT EXISTS transactions(\n                id SERIAL PRIMARY KEY,\n                createdon TIMESTAMP,\n                type VARCHAR(20) NOT NULL,\n                cashier INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n                amount NUMERIC NOT NULL,\n                oldbalance NUMERIC NOT NULL,\n                newbalance NUMERIC NOT NULL,\n                accountnumber NUMERIC REFERENCES accounts(accountnumber) ON DELETE CASCADE\n            )";

_db.default.query(createTables).then(function () {
  console.log('Successfully tables creation');

  _db.default.end();
}).catch(function (err) {
  console.log(err);
  process.exit(0);
});

module.exports = _db.default;