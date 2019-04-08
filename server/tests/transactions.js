/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app';
import account from '../models/account';

dotenv.config();


chai.use(chaiHttp);
chai.should();

// CREDIT TESTS

describe('credit', () => {
  it('should do credit transactions', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/credit').send({
        amount: '10000',
        cashier: '2',
      })
      .end((err, res) => {
        const accountData = account.find(bankAcc => bankAcc.accountNumber === 4000744000);
        if (accountData) {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('data');
        }
        done();
      });
  });
  it('should throw an error when the account to credit on do not exists', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/400074400/credit').send({
        amount: '10000',
        cashier: '2',
      })
      .end((err, res) => {
        const accountData = account.find(bankAcc => bankAcc.accountNumber === 400074400);
        if (!accountData) {
          res.should.have.status(400);
        }
        done();
      });
  });
  it('should throw an error when the account do not exist', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/40007440/credit').send({
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
      .post('/api/v1/transactions/4000744000/credit').send({
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when cashier number is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/credit').send({
        amount: '10000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when amount is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/40007440/credit').send({
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
      .post('/api/v1/transactions/40007440/credit').send({
        amount: '10000',
        cashier: '2idi',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// DEBIT TESTS
describe('debit', () => {
  it('should do debit transactions', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/debit').send({
        amount: '0',
        cashier: '2',
      })
      .end((err, res) => {
        const accountData = account.find(bankAcc => bankAcc.accountNumber === 4000744000);
        if (accountData) {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('data');
        }
        done();
      });
  });
  it('should throw an error when the account to debit on do not exists', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/400074400/debit').send({
        amount: '0',
        cashier: '2',
      })
      .end((err, res) => {
        const accountData = account.find(bankAcc => bankAcc.accountNumber === 400074400);
        if (!accountData) {
          res.should.have.status(400);
        }
        done();
      });
  });
  it('should throw an error when there is no enough amount', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/debit').send({
        amount: '10000',
        cashier: '2',
      })
      .end((err, res) => {
        const accountData = account.find(bankAcc => bankAcc.accountNumber === 4000744000);
        if (!accountData) {
          res.should.have.status(400);
        }
        done();
      });
  });
  it('should throw an error when amount is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/debit').send({
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when cashier number is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/4000744000/debit').send({
        amount: '10000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when amount is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/40007440/debit').send({
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
      .post('/api/v1/transactions/40007440/debit').send({
        amount: '0',
        cashier: '2idi',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
