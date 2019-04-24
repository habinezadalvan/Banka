"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app.database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_chai.default.use(_chaiHttp.default);

_chai.default.should();

var payload = {
  id: 1,
  firstname: 'christian',
  lastname: 'habineza',
  email: 'tes@gmail.com',
  type: 'client',
  isadmin: 'false'
};

var token = _jsonwebtoken.default.sign(payload, process.env.SECRETKEY);

before('login hook', function () {
  it('should login first before creating bank account', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'user1@gmail.com',
      password: '12345'
    }).end(function (err, res) {
      // console.log(res.body);
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      done();
    });
  });
}); // // CREATE BANK ACCOUNT

describe('Bank accounts', function () {
  it('should be able to create bank account', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', token).send({
      type: 'saving'
    }).end(function (err, res) {
      // console.log(res.body);
      res.should.have.status(201);
      res.body.should.be.an('object');
      res.body.should.have.property('data');
      done();
    });
  });
  it('should throw an error when firstname is not entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', token).send({
      lastname: 'habineza',
      email: 'habinezadalvan@gmail.com',
      type: 'saving'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when lastname is not entered', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', token).send({
      firstname: 'christian',
      email: 'habinezadalvan@gmail.com',
      type: 'saving'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when email is not given', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', token).send({
      firstname: 'christian',
      lastname: 'habineza',
      type: 'saving'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when type is not given', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', token).send({
      firstname: 'christian',
      lastname: 'habineza',
      email: 'habinezadalvan@gmail.com'
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
  });
  it('should throw an errow when status is not entered', function (done) {
    _chai.default.request(_app.default).patch('/api/v2/account/4000744000').set('Authorization', token).send({}).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when status is different from active and dormant', function (done) {
    _chai.default.request(_app.default).patch('/api/v2/account/4000744000').set('Authorization', token).send({
      status: 'proactive'
    }).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should throw an error when the account does not exist', function (done) {
    _chai.default.request(_app.default).patch('/api/v2/account/40007440002').set('Authorization', token).send({
      status: 'active'
    }).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
  it('should throw an error when there is no bank account to delete', function (done) {
    _chai.default.request(_app.default).delete('/api/v2/account/400074400078').set('Authorization', token).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('message');
      done();
    });
  });
});