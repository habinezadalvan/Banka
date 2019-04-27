"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use('/swaggerapi', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to banka'
  });
});
app.use(_routes.default);
app.listen(process.env.PORT || 3000, function () {
  console.log('App listen on port 3000');
});
var _default = app;
exports.default = _default;