
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
  email: 'admin@gmail.com',
  type: 'staff',
  isadmin: 'true',
};
const token = jwt.sign(payload, process.env.SECRETKEY);

before('login hook', () => {
  it('should login first', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin').send({
        email: 'admin@gmail.com',
        password: 'admin123',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
  it('now are not authorized to create bank account', (done) => {
    chai.request(server)
      .post('/api/v2/accounts')
      .set('Authorization', token)
      .send({
        type: 'saving',
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });

  // delete bank account
  it('should be able to delete a bank account', (done) => {
    chai.request(server)
      .get('/api/v2/accounts')
      .set('Authorization', token)
      .end(() => {
        // console.log(res.body);
        chai.request(server)
          .delete(`/api/v2/account/${40002726553}`)
          .set('Authorization', token)
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
          });
      });
  });
});
