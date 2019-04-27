import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app.database';


dotenv.config();
chai.use(chaiHttp);
chai.should();

let usertoken;
let accountnumber;
let staffToken;

// // CREATE BANK ACCOUNT

describe('Bank accounts', () => {
  it('should login first before creating bank account', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin').send({
        email: 'habinezadalvan@gmail.com',
        password: '12345',
      })
      .end((err, res) => {
        usertoken = res.body.data.token;
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should be able to create bank account', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', usertoken)
      .send({
        type: 'savings',
      })
      .end((err, res) => {
        accountnumber = res.body.data.accountNumber;
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should throw an error when type is different from savings or draft', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', usertoken)
      .send({
        type: 'saviiiiiing',
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });


  it('should throw an error when unauthorized', (done) => {
    chai.request(server)
      .get('/api/v2/accounts')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('should throw an error when wrong token', (done) => {
    chai.request(server)
      .get('/api/v2/accounts')
      .set('Authorization', 'wwwewe')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('err');
        res.body.err.should.have.property('name');
        res.body.err.should.have.property('message');
        done();
      });
  });

  // login as a staff
  it('should login first before creating bank account', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin').send({
        email: 'staff@gmail.com',
        password: '12345',
      })
      .end((err, res) => {
        staffToken = res.body.data.token;
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
  // do transactions
  // CREDIT
  it('should do credit', (done) => {
    chai.request(server)
      .get('/api/v2/accounts')
      .set('Authorization', staffToken)
      .end(() => {
        chai.request(server)
          .post(`/api/v2/transactions/${accountnumber}/credit`)
          .set('Authorization', staffToken)
          .send({
            amount: '1000000',
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });
  // DEBIT
  it('should do credit', (done) => {
    chai.request(server)
      .get('/api/v2/accounts')
      .set('Authorization', staffToken)
      .end(() => {
        chai.request(server)
          .post(`/api/v2/transactions/${accountnumber}/debit`)
          .set('Authorization', staffToken)
          .send({
            amount: '20000',
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });
});
