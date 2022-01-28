const AxiosConfig = {
  BackendUrl: 'https://accelerator-guitar-shop-api-v1.glitch.me/',
  RequestTimeout: 10000,
};

enum ServerRoute {
  Guitars = 'guitars',
}

export const HttpCode = {
  NotFound: 404,
  Forbidden: 403,
  ServerErrorMin: 500,
  ServerErrorMax: 599,
};

export const ERROR_MESSAGE = 'We have a little problem. Please try again later.';

export const ERROR_403_MESSAGE = 'Our server understood the request, but refuses to authorize it';

export const ERROR_404_MESSAGE = 'No data found for your query.';

export { AxiosConfig, ServerRoute };
