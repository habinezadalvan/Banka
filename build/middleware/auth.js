"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var Authorization =
/*#__PURE__*/
function () {
  function Authorization() {
    _classCallCheck(this, Authorization);
  }

  _createClass(Authorization, null, [{
    key: "authorization",
    value: function authorization(req, res, next) {
      var token = req.headers.authorization;

      if (!token || token === ' ') {
        return res.status(401).json({
          status: 401,
          message: 'You are not Authorized'
        });
      }

      _jsonwebtoken.default.verify(token, process.env.SECRETKEY, function (err, decode) {
        if (err) {
          res.status(401).json({
            err: err
          });
        } else {
          req.user = decode;
          next();
        }
      });
    }
  }]);

  return Authorization;
}();

var _default = Authorization;
exports.default = _default;