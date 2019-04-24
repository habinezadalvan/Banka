"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app.database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_chai.default.use(_chaiHttp.default);

_chai.default.should(); // login tests part


describe('login', function () {
  it('should be able to login', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'admin@gmail.com',
      password: 'admin123'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('data');
      done();
    });
  });
  it('should throw error when the login email does not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'habinezadalvanhkjk@gmail.com',
      password: '12345'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw error when Incorrect password', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'admin@gmail.com',
      password: '12345sdfsd'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw error when entered no email', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      password: 'admin123'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw error when no password entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'admin@gmail.com'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});