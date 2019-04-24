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
  email: 'admin@gmail.com',
  type: 'staff',
  isadmin: 'true'
};

var token = _jsonwebtoken.default.sign(payload, process.env.SECRETKEY);

before('login hook', function () {
  it('should login first', function (done) {
    _chai.default.request(_app.default).post('/api/v2/auth/signin').send({
      email: 'admin@gmail.com',
      password: 'admin123'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      done();
    });
  });
  it('now are not authorized to create bank account', function (done) {
    _chai.default.request(_app.default).post('/api/v2/accounts').set('Authorization', token).send({
      type: 'saving'
    }).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message');
      done();
    });
  }); // delete bank account

  it('should be able to delete a bank account', function (done) {
    _chai.default.request(_app.default).get('/api/v2/accounts').set('Authorization', token).end(function () {
      // console.log(res.body);
      _chai.default.request(_app.default).delete("/api/v2/account/".concat(40007317369)).set('Authorization', token).end(function (err, res) {
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
    });
  });
});