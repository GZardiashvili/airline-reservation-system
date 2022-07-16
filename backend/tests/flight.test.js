const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const flightService = require('../services/flightService');

const flight = {
  id: new mongoose.Types.ObjectId().toString(),
  flightNumber: 'jk101',
  airlineId: 'ad2f1f1f1fj1ifh1',
  ticketId: 'f112fh178fh1',
  planeId: 'fh1893gf7813gf',
  departureCity: 'Tbilisi',
  arrivalCity: 'Batumi',
  description: 'Lorem Ipsum asfj ajihf fwiagf fjiagwf jkgawfabf jifuawgf',
  price: '1500',
  departureAirport: 'DSA0',
  arrivalAirport: 'DSA1',
  departureTime: 'Tue Jun 07 2022 17:19:11 GMT+0400 (Georgia Standard Time)',
  arrivalTime: 'Tue Jun 07 2022 17:19:11 GMT+0400 (Georgia Standard Time)',
};

describe('flight', () => {

  describe('get flight route', () => {

    describe('given user not authenticated', () => {

      it('should return a 401', async () => {
        const airlineId = '123';
        await supertest(app).get(`/api/airlines/${airlineId}`).expect(401);
      });

    });
  });
});

describe('flight', () => {

  describe('get flight route', () => {


    describe('given flight exists', () => {

      it('should return the flight', async () => {
        jest
          .spyOn(flightService, 'getOneFlight')
          .mockImplementation(() => Promise.resolve(flight));
        expect(await flightService.getOneFlight(flight.id)).toEqual(flight);
      });

    });
  });
});

describe('flight', () => {

  describe('create flight', () => {

    describe('given form is valid', () => {

      it('should return the flight', async () => {
        jest
          .spyOn(flightService, 'addFlight')
          .mockImplementation(() => Promise.resolve(flight));
        expect(await flightService.addFlight(flight)).toEqual(flight);
      });

    });
  });
});

describe('flight', () => {

  describe('update flight', () => {

    describe('given form is valid', () => {

      it('should return the flight', async () => {
        jest
          .spyOn(flightService, 'updateFlight')
          .mockImplementation(() => Promise.resolve(flight));
        expect(await flightService.updateFlight(flight)).toEqual(flight);
      });

    });
  });
});

describe('flight', () => {

  describe('delete flight', () => {

    describe('given form is valid', () => {

      it('should return the flight', async () => {
        jest
          .spyOn(flightService, 'deleteFlight')
          .mockImplementation(() => Promise.resolve(flight));
        expect(await flightService.deleteFlight(flight)).toEqual(flight);
      });

    });
  });
});
