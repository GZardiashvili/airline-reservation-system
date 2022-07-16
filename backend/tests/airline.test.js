/* eslint-disable padded-blocks */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const airlineService = require('../services/airlineService');

const airline = {
  id: new mongoose.Types.ObjectId().toString(),
  company: 'test airline',
  airlineCode: 'AR12',
  description: 'This is Test airline description',
  flightIds: '62b590510cf8debe7e279001',
};

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

describe('airline', () => {

  describe('get airline route', () => {

    describe('given airline exists', () => {

      it('should return the airline', async () => {
        jest
          .spyOn(airlineService, 'getOneAirline')
          .mockImplementation(() => Promise.resolve(airline));
        expect(await airlineService.getOneAirline(airline.id)).toEqual(airline);
      });

    });
  });
});

describe('airline', () => {

  describe('create airline', () => {

    describe('given form is valid', () => {

      it('should return the airline', async () => {
        jest
          .spyOn(airlineService, 'addAirline')
          .mockImplementation(() => Promise.resolve(airline));
        expect(await airlineService.addAirline(airline)).toEqual(airline);
      });

    });
  });
});

describe('airline', () => {

  describe('update airline', () => {

    describe('given form is valid', () => {

      it('should return the airline', async () => {
        jest
          .spyOn(airlineService, 'updateAirline')
          .mockImplementation(() => Promise.resolve(airline));
        expect(await airlineService.updateAirline(airline)).toEqual(airline);
      });

    });
  });
});

describe('airline', () => {

  describe('delete airline', () => {

    describe('given form is valid', () => {

      it('should return the airline', async () => {
        jest
          .spyOn(airlineService, 'deleteAirline')
          .mockImplementation(() => Promise.resolve(airline));
        expect(await airlineService.deleteAirline(airline)).toEqual(airline);
      });

    });
  });
});
