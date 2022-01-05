import { Guitar } from '../types/guitar';

const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  getGuitar: (guitarID: Guitar['id']) => `/catalog/${guitarID}`,
};

export { AppRoute };
