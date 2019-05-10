"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app.database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_chai.default.use(_chaiHttp.default);

_chai.default.should();

var usertoken;
var accountnumber;
var staffToken; // // CREATE BANK ACCOUNT

describe('Bank accounts', function () {
  it('should login first before creating bank account', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'habinezadalvan@gmail.com',
      password: '12345'
    }).end(function (err, res) {
      usertoken = res.body.data.token;
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      done();
    });
  });
  it('should be able to create bank account', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', usertoken).send({
      type: 'savings'
    }).end(function (err, res) {
      accountnumber = res.body.data.accountNumber;
      res.should.have.status(201);
      res.body.should.be.an('object');
      res.body.should.have.property('data');
      done();
    });
  });
  it('should throw an error when type is different from savings or draft', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', usertoken).send({
      type: 'saviiiiiing'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when unauthorized', function (done) {
    _chai.default.request(_app.default).get('/api/v2/accounts').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('should throw an error when wrong token', function (done) {
    _chai.default.request(_app.default).get('/api/v2/accounts').set('Authorization', 'wwwewe').end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an('object');
      res.body.should.have.property('err');
      res.body.err.should.have.property('name');
      res.body.err.should.have.property('message');
      done();
    });
  }); // login as a staff

  it('should login first before creating bank account', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'staff@gmail.com',
      password: '12345'
    }).end(function (err, res) {
      staffToken = res.body.data.token;
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      done();
    });
  }); // do transactions
  // CREDIT

  it('should do credit', function (done) {
    _chai.default.request(_app.default).get('/api/v2/accounts').set('Authorization', staffToken).end(function () {
      _chai.default.request(_app.default).post("/api/v2/transactions/".concat(accountnumber, "/credit")).set('Authorization', staffToken).send({
        amount: '1000000'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
    });
  }); // DEBIT

  it('should do credit', function (done) {
    _chai.default.request(_app.default).get('/api/v2/accounts').set('Authorization', staffToken).end(function () {
      _chai.default.request(_app.default).post("/api/v2/transactions/".concat(accountnumber, "/debit")).set('Authorization', staffToken).send({
        amount: '20000'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
    });
  });
});