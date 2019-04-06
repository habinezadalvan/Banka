/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app';
import users from '../models/signup';

dotenv.config();


chai.use(chaiHttp);
chai.should();

// login tests part

describe('Bank accounts', () => {
  it.only('should be able to create bank account', (done) => {
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
  it.only('should throw an error when firstName is not entered', (done) => {
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
  it.only('should throw an error when lastName is not entered', (done) => {
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
  it.only('should throw an error when email is not given', (done) => {
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
  it.only('should throw an error when type is not given', (done) => {
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
});
