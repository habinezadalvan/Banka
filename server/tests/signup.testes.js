import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app.database';

dotenv.config();


chai.use(chaiHttp);
chai.should();

// signup tests part

describe('signup', () => {
  it('should be able to signup', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup').send({
        firstname: 'christian',
        lastname: 'habineza',
        email: 'tests1@gmail.com',
        password: '12345',
        confirmpassword: '12345',
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
      .post('/api/v2/auth/signup').send({
        firstname: 'chris',
        lastname: 'habineza',
        email: 'habineza@gmail.com',
        password: 'qwerty',
        confirmpassword: 'qwer',
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
      .post('/api/v2/auth/signup').send({
        firstname: 'chris',
        lastname: 'habineza',
        email: 'habinezadalvan@gmail.com',
        password: 'qwerty',
        confirmpassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('should give an error when firstname is not entered', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup').send({
        lastname: 'habineza',
        email: 'habine@gmail.com',
        password: 'qwerty',
        confirmpassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when lastname is not entered', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup').send({
        firstname: 'chris',
        email: 'habine@gmail.com',
        password: 'qwerty',
        confirmpassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when email is not entered', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup').send({
        firstname: 'chris',
        lastname: 'habineza',
        password: 'qwerty',
        confirmpassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when password is not entered', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup').send({
        firstname: 'chris',
        lastname: 'habineza',
        email: 'habine@gmail.com',
        confirmpassword: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should give an error when confirm password is not entered', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup').send({
        firstname: 'chris',
        lastname: 'habineza',
        email: 'habine@gmail.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
