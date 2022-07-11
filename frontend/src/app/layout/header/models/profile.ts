import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

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
  ArsManager: {
    id: string,
    label: string,
    url: string,
    permission: string,
  };
  logout: string;
}
