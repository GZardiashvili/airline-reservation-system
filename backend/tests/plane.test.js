const supertest = require('supertest');
const app = require('../app');

describe('plane', () => {
  describe('get plane route', () => {
    describe('given the plane does not exist', () => {
      it('should return a 404', async () => {
        const planeId = '123';
        await supertest(app).get(`/api/planes/${planeId}`).expect(401);
      });
    });
  });
});
