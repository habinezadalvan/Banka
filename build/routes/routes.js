"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("./users.routes"));

var _accounts = _interopRequireDefault(require("./accounts.routes"));

var _transactions = _interopRequireDefault(require("./transactions.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_users.default, _accounts.default, _transactions.default);
var _default = app;
exports.default = _default;