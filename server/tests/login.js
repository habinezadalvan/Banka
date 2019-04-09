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

describe('login', () => {
  it('should be able to login', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin').send({
        email: 'habinezadalvan@gmail.com',
        password: '12345',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should throw error when the login email does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin').send({
        email: 'habinezadalvanhkjk@gmail.com',
        password: '12345',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw error when Incorrect password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin').send({
        email: 'habinezadalvan@gmail.com',
        password: '12345sdfsd',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw error when entered no email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin').send({
        password: '12345sdfsd',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw error when no password entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin').send({
        email: 'habinezadalvan@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
