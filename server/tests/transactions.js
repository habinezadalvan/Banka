/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../app';


dotenv.config();


chai.use(chaiHttp);
chai.should();

const payload = {
  id: 1,
};

const token = jwt.sign(payload, process.env.SECRETKEY);

// CREATE BANK ACCOUNT BEFORE TRANSACTIONS

describe('create account hook', () => {
  it('should create account hook', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .set('Authorization', token)
      .send({
        email: 'habinezadalvan@gmail.com',
        firstName: 'christian',
        lastName: 'habineza',
        type: 'savings',
      })
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
});
// GET ALL TRANSACTIONS
it('should THROW ERROW WHEN NO TRANSACTIONS', (done) => {
  chai.request(server)
    .get('/api/v1/transactions')
    .set('Authorization', token)
    .end((err, res) => {
      // console.log(res.body);
      res.should.have.status(404);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message');
      done();
    });
});
// // CREDIT TESTS

describe('credit', () => {
  // GET ALL BANK ACCOUNTS
  it('should be able to get all bank accounts', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  // DO CREDIT TRANSACTION
  it('should do credit transactions', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('Authorization', token)
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(server)
          .post(`/api/v1/transactions/${res.body.data[0].accountNumber}/credit`)
          .set('Authorization', token)
          .send({
            amount: '10000',
            cashier: '2',
          })
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });
  it('should throw an error when the account to credit on do not exists', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744/credit')
      .set('Authorization', token)
      .send({
        amount: '10000',
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when the account do not exist', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744/credit')
      .set('Authorization', token)
      .send({
        amount: '10000',
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when amount is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/credit')
      .set('Authorization', token)
      .send({
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when cashier number is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/credit')
      .set('Authorization', token)
      .send({
        amount: '10000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when amount is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/40007440/credit')
      .set('Authorization', token)
      .send({
        amount: '10000hffh',
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when cashier number is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/40007440/credit')
      .set('Authorization', token)
      .send({
        amount: '100000',
        cashier: '2idi',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


// // DEBIT TESTS
describe('debit', () => {
  it('should do debit transactions', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        // console.log(res.body);
        chai.request(server)
          .post(`/api/v1/transactions/${res.body.data[0].accountNumber}/debit`)
          .set('Authorization', token)
          .send({
            amount: '10000',
            cashier: '2',
          })
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('data');
            done();
          });
      });
  });
  it('should throw an error when the account to debit on do not exists', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744/debit')
      .set('Authorization', token)
      .send({
        amount: '0',
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when there is no enough amount', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        chai.request(server)
          .post(`/api/v1/transactions/${res.body.data[0].accountNumber}/debit`)
          .set('Authorization', token)
          .send({
            amount: '500000',
            cashier: '2',
          })
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(400);
            done();
          });
      });
  });
  it('should throw an error when amount is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/debit')
      .set('Authorization', token)
      .send({
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when cashier number is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/debit')
      .set('Authorization', token)
      .send({
        amount: '10000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when amount is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/40007440/debit')
      .set('Authorization', token)
      .send({
        amount: '10000hffh',
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when cashier number is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/40007440/debit')
      .set('Authorization', token)
      .send({
        amount: '0',
        cashier: '2idi',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  // get all the transactions
  it('should GET ALL TRANSACTIONS', (done) => {
    chai.request(server)
      .get('/api/v1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
});
