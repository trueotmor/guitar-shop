const AxiosConfig = {
  BackendUrl: 'https://accelerator-guitar-shop-api-v1.glitch.me/',
  RequestTimeout: 10000,
};

enum ServerRoute {
  Guitars = 'guitars',
}

export { AxiosConfig, ServerRoute };
