const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

const database = require('../src/config/database');
const server = require('../server');

const User = require('../src/models/User');

chai.use(chaiHttp);

describe('Users', () => {
  const user = new User({
    name: 'Carlos Silva',
    email: 'carlos.silva@gmail.com',
    password: '123b',
    telephones: [
      {
        number: '984150800',
        code_area: 81,
      },
      {
        number: '984516932',
        code_area: 81,
      },
    ],
  });

  after(async () => {
    await User.deleteOne({ email: 'carlos.silva@gmail.com' });
  });

  describe('Create user', () => {
    it('Testing user creation', (done) => {
      chai
        .request('http://localhost:3333')
        .post('/register')
        .send(user)
        .end((request, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).have.property('_id');
          expect(response.body).have.property('created_at');
          expect(response.body).have.property('modified_at');
          done();
        });
    });

    it('Test create user with same email should return code 400', (done) => {
      chai
        .request('http://localhost:3333')
        .post('/register')
        .send(user)
        .end((request, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });

  describe('Check user information', () => {
    const credentials = {
      email: user.email,
      password: user.password,
    };

    it('Testing to check user information', (done) => {
      chai
        .request('http://localhost:3333')
        .post('/login')
        .send(credentials)
        .end((request, response) => {
          expect(response.status).to.equal(200);
          chai
            .request('http://localhost:3333')
            .get('/users')
            .set('Authorization', response.body.token)
            .set('X-Access-Token', response.body._id)
            .end((request, response) => {
              expect(response.status).to.equal(200);
              expect(response.body).have.property('_id');
              expect(response.body).have.property('email');
              expect(response.body).have.property('telephones');
              expect(response.body).have.property('created_at');
              expect(response.body).have.property('modified_at');
              done();
            });
        });
    });

    it('Testing to check user information with invalid _id', (done) => {
      chai
        .request('http://localhost:3333')
        .post('/login')
        .send(credentials)
        .end((request, response) => {
          expect(response.status).to.equal(200);
          chai
            .request('http://localhost:3333')
            .get('/users')
            .set('Authorization', response.body.token)
            .set('X-Access-Token', '09438')
            .end((request, response) => {
              expect(response.status).to.equal(404);
              expect(response.body.error).to.equal('User not found.');
              done();
            });
        });
    });
  });

  describe('Access users route with invalid data', () => {
    it('Test access users route with invalid token', (done) => {
      chai
        .request('http://localhost:3333')
        .get('/users')
        .set('Authorization', '123')
        .end((request, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('Invalid token');
          done();
        });
    });

    it('Test access user route with no token', (done) => {
      chai
        .request('http://localhost:3333')
        .get('/users')
        .set('Authorization', '')
        .end((request, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('No token found.');
          done();
        });
    });
  });
});
