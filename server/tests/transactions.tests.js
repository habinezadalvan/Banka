import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../app.database';


dotenv.config();


chai.use(chaiHttp);
chai.should();


const payload = {
  id: 1,
  firstname: 'christian',
  lastname: 'habineza',
  email: 'admin@gmail.com',
  type: 'staff',
  isadmin: 'true',
};
const token = jwt.sign(payload, process.env.SECRETKEY);


describe('login before transactions', () => {
  it('should be able to login', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin').send({
        email: 'admin@gmail.com',
        password: 'admin123',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

// // CREDIT TESTS

describe('credit', () => {
  // DO CREDIT TRANSACTION
  it('should throw an error when the account to credit on do not exists', (done) => {
    chai.request(server)
      .post('/api/v2/transactions/4000744/credit')
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
      .post('/api/v2/transactions/4000744/credit')
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
      .post('/api/v2/transactions/4000744000/credit')
      .set('Authorization', token)
      .send({
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when amount is not a number', (done) => {
    chai.request(server)
      .post('/api/v2/transactions/40007440/credit')
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
      .post('/api/v2/transactions/40007440/credit')
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
  it('should throw an error when the account to debit on do not exists', (done) => {
    chai.request(server)
      .post('/api/v2/transactions/4000744/debit')
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
  it('should throw an error when amount is not provided', (done) => {
    chai.request(server)
      .post('/api/v2/transactions/4000744000/debit')
      .set('Authorization', token)
      .send({
        cashier: '2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw an error when amount is not a number', (done) => {
    chai.request(server)
      .post('/api/v2/transactions/40007440/debit')
      .set('Authorization', token)
      .send({
        amount: '10000hffh',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when cashier number is not a number', (done) => {
    chai.request(server)
      .post('/api/v2/transactions/40007440/debit')
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
});
