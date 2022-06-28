export interface Profile {
  sign: {
    in: string;
    up: string;
  };
  pfpUrl: string;
  account: {
    label: string;
    url: string;
  };
  bookings: {
    label: string;
    url: string;
  };
  logout: string;
}
