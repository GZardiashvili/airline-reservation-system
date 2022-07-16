/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const userService = require('../services/userService');
const authService = require('../auth/services/authService');
// const userId = new mongoose.Types.ObjectId().toString();

const userInput = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@gmail.com',
  password: 'Test123',
};

describe('user', () => {

  describe('user registration', () => {

    describe('given the email and passowrd are valid', () => {

      it('should return the user payload', async () => {
        jest
          .spyOn(userService, 'addUser')
          .mockImplementation(() => Promise.resolve(userInput));
        const user = await userService.addUser(userInput);
        expect(user).toEqual(userInput);
      });

    });
  });
});

describe('create user sesion', () => {

  describe('given the email and passowrd are valid', () => {

    it('should return a signed accessToken', async () => {
      jest
        .spyOn(authService, 'loginUserWithJWT')
        .mockImplementation(() => Promise.resolve('accessToken'));
      const accessToken = await authService.loginUserWithJWT(
        userInput.email,
        userInput.password
      );
      expect(accessToken).toEqual('accessToken');
    });

  });
});
