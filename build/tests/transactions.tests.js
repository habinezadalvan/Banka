"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app.database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_chai.default.use(_chaiHttp.default);

_chai.default.should();

var payload = {
  id: 1,
  firstname: 'christian',
  lastname: 'habineza',
  email: 'admin@gmail.com',
  type: 'staff',
  isadmin: 'true'
};

var token = _jsonwebtoken.default.sign(payload, process.env.SECRETKEY);

describe('login before transactions', function () {
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
}); // // CREDIT TESTS

describe('credit', function () {
  // DO CREDIT TRANSACTION
  it('should throw an error when the account to credit on do not exists', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/4000744/credit').set('Authorization', token).send({
      amount: '10000',
      cashier: '2'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when the account do not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/4000744/credit').set('Authorization', token).send({
      amount: '10000',
      cashier: '2'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when amount is not provided', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/4000744000/credit').set('Authorization', token).send({
      cashier: '2'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when amount is not a number', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/40007440/credit').set('Authorization', token).send({
      amount: '10000hffh',
      cashier: '2'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when cashier number is not a number', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/40007440/credit').set('Authorization', token).send({
      amount: '100000',
      cashier: '2idi'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
}); // // DEBIT TESTS

describe('debit', function () {
  it('should throw an error when the account to debit on do not exists', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/4000744/debit').set('Authorization', token).send({
      amount: '0',
      cashier: '2'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when amount is not provided', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/4000744000/debit').set('Authorization', token).send({
      cashier: '2'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when amount is not a number', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/40007440/debit').set('Authorization', token).send({
      amount: '10000hffh'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when cashier number is not a number', function (done) {
    _chai.default.request(_app.default).post('/api/v2/transactions/40007440/debit').set('Authorization', token).send({
      amount: '0',
      cashier: '2idi'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});