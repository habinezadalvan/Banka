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

// signup tests part

describe('signup', () => {
  it('should be able to signup', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        firstName: 'chris',
        lastName: 'habineza',
        email: 'habine@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should give an error password and confirm password do not match', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        firstName: 'chris',
        lastName: 'habineza',
        email: 'habine@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwer',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should varify whether email has been used/ is already in the system ', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        firstName: 'chris',
        lastName: 'habineza',
        email: 'habinezadalvan@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwerty',
      })
      .end((err, res) => {
        const signupdata = users.find(email => email.email === res.body.email);
        if (signupdata) {
          res.should.have.status(400);
        }
      });
    done();
  });

  it('should give an error when firstName is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        lastName: 'habineza',
        email: 'habine@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when lastName is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        firstName: 'chris',
        email: 'habine@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when email is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        firstName: 'chris',
        lastName: 'habineza',
        password: 'qwerty',
        confirmPassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when password is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        firstName: 'chris',
        lastName: 'habineza',
        email: 'habine@gmail.com',
        confirmPassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when confirm password is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup').send({
        firstName: 'chris',
        lastName: 'habineza',
        email: 'habine@gmail.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should get all users', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
