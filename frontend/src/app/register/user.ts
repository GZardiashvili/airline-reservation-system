export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthDate: Date;
  pfpUrl: string;
  phone: string;
  country: string;
  state: string;
  city: string;
}
