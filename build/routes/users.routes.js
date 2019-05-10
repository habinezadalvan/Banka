"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/api/v2/auth/signup', _users.default.signup);
router.post('/api/v2/auth/signin', _users.default.login);
router.post('/api/v2/auth/staffaccount', _auth.default.authorization, _users.default.createStaffAccount);
var _default = router;
exports.default = _default;