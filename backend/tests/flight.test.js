const supertest = require('supertest');
const app = require('../app');

describe('airline', () => {
  describe('get airline route', () => {
    describe('given user not authenticated', () => {
      it('should return a 401', async () => {
        const airlineId = '123';
        await supertest(app).get(`/api/airlines/${airlineId}`).expect(401);
      });
    });
  });
});
