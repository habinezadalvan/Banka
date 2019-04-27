"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app.database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_chai.default.use(_chaiHttp.default);

_chai.default.should(); // signup tests part


describe('signup', function () {
  it('should be able to signup', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      firstname: 'christian',
      lastname: 'habineza',
      email: 'habinezadalvan@gmail.com',
      password: '12345',
      confirmpassword: '12345'
    }).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.an('object');
      res.body.should.have.property('data');
      done();
    });
  });
  it('should give an error password and confirm password do not match', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      firstname: 'chris',
      lastname: 'habineza',
      email: 'habineza@gmail.com',
      password: 'qwerty',
      confirmpassword: 'qwer'
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message');
      done();
    });
  });
  it('should varify whether email has been used/ is already in the system ', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      firstname: 'chris',
      lastname: 'habineza',
      email: 'habinezadalvan@gmail.com',
      password: 'qwerty',
      confirmpassword: 'qwerty'
    }).end(function (err, res) {
      res.should.have.status(400);
    });

    done();
  });
  it('should give an error when firstname is not entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      lastname: 'habineza',
      email: 'habine@gmail.com',
      password: 'qwerty',
      confirmpassword: 'qwerty'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should give an error when lastname is not entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      firstname: 'chris',
      email: 'habine@gmail.com',
      password: 'qwerty',
      confirmpassword: 'qwerty'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should give an error when email is not entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      firstname: 'chris',
      lastname: 'habineza',
      password: 'qwerty',
      confirmpassword: 'qwerty'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should give an error when password is not entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      firstname: 'chris',
      lastname: 'habineza',
      email: 'habine@gmail.com',
      confirmpassword: 'qwerty'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should give an error when confirm password is not entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signup').send({
      firstname: 'chris',
      lastname: 'habineza',
      email: 'habine@gmail.com',
      password: 'qwerty'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});