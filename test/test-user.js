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

  afterEach(async () => {
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
  });
});
