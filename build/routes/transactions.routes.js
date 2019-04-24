"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _transactions = _interopRequireDefault(require("../controllers/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/api/v2/transactions/:accountNumber/debit', _auth.default.authorization, _transactions.default.debitMethod);
router.post('/api/v2/transactions/:accountNumber/credit', _auth.default.authorization, _transactions.default.creditMethod);
router.get('/api/v2/accounts/:accountNumber/transactions', _auth.default.authorization, _transactions.default.viewAllAccountTransactions);
router.get('/api/v2/transactions/:transactionId', _auth.default.authorization, _transactions.default.getSpecificTransaction);
var _default = router;
exports.default = _default;