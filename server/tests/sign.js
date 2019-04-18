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

const payload = { id: 1 };

const token = jwt.sign(payload, process.env.SECRETKEY);

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
        email: 'habineza@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwer',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
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
        res.should.have.status(400);
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
  // it('should get all users', (done) => {
  //   chai.request(server)
  //     .get('/api/v1/users')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       done();
  //     });
  // });
});
