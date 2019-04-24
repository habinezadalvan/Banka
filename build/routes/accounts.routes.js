"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _accounts = _interopRequireDefault(require("../controllers/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/api/v2/accounts', _auth.default.authorization, _accounts.default.getAllCounts);
router.post('/api/v2/accounts', _auth.default.authorization, _accounts.default.createBankAccount);
router.patch('/api/v2/account/:accountNumber', _auth.default.authorization, _accounts.default.activateDeactivateAccount);
router.delete('/api/v2/account/:accountNumber', _auth.default.authorization, _accounts.default.deleteAccount);
router.get('/api/v2/accounts/:accountNumber', _auth.default.authorization, _accounts.default.getAccountDetails);
router.get('/api/v2/:email/accounts', _auth.default.authorization, _accounts.default.getAllUserAccounts);
router.get('/api/accounts', _auth.default.authorization, _accounts.default.getAllAccountsByStatus);
var _default = router;
exports.default = _default;