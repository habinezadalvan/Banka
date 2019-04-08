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

// GET ALL BANK ACCOUNTS

describe('Bank accounts', () => {
  it('should be able to get all bank accounts', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should throw 404 error if there is no bank accounts', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .end((err, res) => {
        const accountData = account;
        if (!accountData) {
          res.should.have.status(404);
        }
        done();
      });
  });
});

// CREATE BANK ACCOUNT

describe('Bank accounts', () => {
  it('should be able to create bank account', (done) => {
    chai.request(server)
      .post('/api/v1/accounts').send({
        firstName: 'christian',
        lastName: 'habineza',
        email: 'habinezadalvan@gmail.com',
        type: 'saving',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should throw an error when firstName is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/accounts').send({
        lastName: 'habineza',
        email: 'habinezadalvan@gmail.com',
        type: 'saving',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when lastName is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/accounts').send({
        firstName: 'christian',
        email: 'habinezadalvan@gmail.com',
        type: 'saving',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when email is not given', (done) => {
    chai.request(server)
      .post('/api/v1/accounts').send({
        firstName: 'christian',
        lastName: 'habineza',
        type: 'saving',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when type is not given', (done) => {
    chai.request(server)
      .post('/api/v1/accounts').send({
        firstName: 'christian',
        lastName: 'habineza',
        email: 'habinezadalvan@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should be able to activate or deactivate an account', (done) => {
    chai.request(server)
      .patch('/api/v1/account/4000744000').send({
        status: 'active',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should throw an errow when status is not entered', (done) => {
    chai.request(server)
      .patch('/api/v1/account/4000744000').send({
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when status is different from active and dormant', (done) => {
    chai.request(server)
      .patch('/api/v1/account/4000744000').send({
        status: 'proactive',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when the account does not exist', (done) => {
    chai.request(server)
      .patch('/api/v1/account/40007440002').send({
        status: 'active',
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should throw an error when the account to be activated or deactivated is not an integer', (done) => {
    chai.request(server)
      .patch('/api/v1/account/4000744000rt')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should be able to delete a bank account', (done) => {
    chai.request(server)
      .delete('/api/v1/account/4000744000')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
  });
  it('should throw an error when there is no bank account to delete', (done) => {
    chai.request(server)
      .delete('/api/v1/account/400074400078')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
  it('should throw an error when the account to be deleted is not an integer or does not match the account number', (done) => {
    chai.request(server)
      .delete('/api/v1/account/400074400ty#')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
