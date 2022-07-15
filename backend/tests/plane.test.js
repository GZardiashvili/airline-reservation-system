const supertest = require('supertest');
const app = require('../app');
const planeService = require('../services/planeService');

const plane = {
  airlineId: '62acde10bb57d6b213888004',
  model: 'sssss 432-800',
  seats: 100,
};

describe('plane', () => {
  describe('get plane route', () => {
    describe('given user not authenticated', () => {
      it('should return a 401', async () => {
        const planeId = '123';
        await supertest(app).get(`/api/planes/${planeId}`).expect(401);
      });
    });
  });
});

describe('plane', () => {
  describe('get plane route', () => {
    describe('given plane exists', () => {
      it('should return the plane', async () => {
        jest
          .spyOn(planeService, 'getOnePlane')
          .mockImplementation(() => Promise.resolve(plane));
        expect(await planeService.getOnePlane(plane.id)).toEqual(plane);
      });
    });
  });
});
