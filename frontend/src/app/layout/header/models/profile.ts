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
  display: {
    label: string;
    url: string;
  };
  logout: string;
}
