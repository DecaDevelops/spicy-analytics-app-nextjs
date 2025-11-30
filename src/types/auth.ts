type cookie = {
  name: string;
  value: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
};

type localStorage = {
  name: string;
  value: string;
};

type origin = {
  origin: string;
  localStorage: localStorage[];
};

export type AuthData = {
  cookies: cookie[];
  origins: origin[];
};

export type BearerTokens = {
  bearer: string;
};
