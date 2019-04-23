/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import server from '../app.database';


dotenv.config();


chai.use(chaiHttp);
chai.should();

const payload = {
  id: 1,
  firstname: 'christian',
  lastname: 'habineza',
  email: 'tes@gmail.com',
  type: 'client',
  isadmin: 'false',
};
const token = jwt.sign(payload, process.env.SECRETKEY);

before('login hook', () => {
  it('should login', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin').send({
        email: 'tests@gmail.com',
        password: '12345',
      })
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

// // CREATE BANK ACCOUNT

describe('Bank accounts', () => {
  it('should be able to create bank account', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', token)
      .send({
        type: 'saving',
      })
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should throw an error when firstname is not entered', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', token)
      .send({
        lastname: 'habineza',
        email: 'habinezadalvan@gmail.com',
        type: 'saving',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when lastname is not entered', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', token)
      .send({
        firstname: 'christian',
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
      .post('/api/v2/accounts')
      .set('Authorization', token)
      .send({
        firstname: 'christian',
        lastname: 'habineza',
        type: 'saving',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when type is not given', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', token)
      .send({
        firstname: 'christian',
        lastname: 'habineza',
        email: 'habinezadalvan@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(400);
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

  it('should throw an errow when status is not entered', (done) => {
    chai.request(server)
      .patch('/api/v2/account/4000744000')
      .set('Authorization', token)
      .send({
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should throw an error when status is different from active and dormant', (done) => {
    chai.request(server)
      .patch('/api/v2/account/4000744000')
      .set('Authorization', token)
      .send({
        status: 'proactive',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw an error when the account does not exist', (done) => {
    chai.request(server)
      .patch('/api/v2/account/40007440002')
      .set('Authorization', token)
      .send({
        status: 'active',
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  // it('should throw an error when the account to be activated or deactivated is not an integer', (done) => {
  //   chai.request(server)
  //     .get('/api/v2/accounts')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       // console.log(res.body);
  //       chai.request(server)
  //         .patch(`/api/v2/account/${res.body.data[0].accountNumber}${'hsh'}`)
  //         .set('Authorization', token)
  //         .send({
  //           status: 'active',
  //         })
  //         .end((err, res) => {
  //           // console.log(res.body);
  //           res.should.have.status(400);
  //           done();
  //         });
  //     });
  // });
  // delete bank account
  // it('should be able to delete a bank account', (done) => {
  //   chai.request(server)
  //     .get('/api/v2/accounts')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       // console.log(res.body);
  //       chai.request(server)
  //         .delete(`/api/v2/account/${res.body.data[0].accountNumber}`)
  //         .set('Authorization', token)
  //         .end((err, res) => {
  //           // console.log(res.body);
  //           res.should.have.status(200);
  //           res.body.should.have.property('message');
  //           done();
  //         });
  //     });
  // });
  it('should throw an error when there is no bank account to delete', (done) => {
    chai.request(server)
      .delete('/api/v2/account/400074400078')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
});
