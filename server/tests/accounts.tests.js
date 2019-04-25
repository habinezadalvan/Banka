import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app.database';


dotenv.config();
chai.use(chaiHttp);
chai.should();

let usertoken;

// // CREATE BANK ACCOUNT

describe('Bank accounts', () => {
  it('should login first before creating bank account', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin').send({
        email: 'habinezadalvan@gmail.com',
        password: '12345',
      })
      .end((err, res) => {
        usertoken = res.body.data.token;
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should be able to create bank account', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', usertoken)
      .send({
        type: 'savings',
      })
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should throw an error when type is different from savings or draft', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', usertoken)
      .send({
        type: 'saviiiiiing',
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
  it('should throw an error when there is no bank account to delete', (done) => {
    chai.request(server)
      .delete('/api/v2/account/400074400078')
      .set('Authorization', usertoken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
  it('should throw an error when the account does not exist', (done) => {
    chai.request(server)
      .patch('/api/v2/account/40007440002')
      .set('Authorization', usertoken)
      .send({
        status: 'active',
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
