const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const userService = require('../services/userService');

const userId = new mongoose.Types.ObjectId().toString();

const userInput = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@gmail.com',
  password: 'test',
};

const userPayload = {
  _id: userId,
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@gmail.com',
  password: 'test',
};

describe('user', () => {
  describe('user registration', () => {
    describe('given the email and passowrd are valid', () => {
      it('should return the user payload', async () => {
        const addUserServiceMock = jest
          .spyOn(userService, 'addUser')
          .mockResolvedValue(userPayload);
        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(userInput);

        expect(addUserServiceMock).toHaveBeenCalledWith(userInput);
        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);
      });
    });
  });
});

// describe('create user sesion', () => {
//   describe('given the email and passowrd are valid', () => {
//     it('should return a signed accessToken', async () => {
//       const userId = '123';
//       await supertest(app).get(`/api/users/${userId}`).expect(404);
//     });
//   });
// });
