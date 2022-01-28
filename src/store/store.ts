import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { AxiosConfig, HttpCode } from '../consts/server-settings';
import { setServerErrorStatus } from './catalog/catalog-data';
import { rootReducer, RootState } from './root-reducer';

const api = axios.create({
  baseURL: AxiosConfig.BackendUrl,
  timeout: AxiosConfig.RequestTimeout,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const status = response?.status;

    if (status && status >= HttpCode.ServerErrorMin && status <= HttpCode.ServerErrorMax) {
      store.dispatch(setServerErrorStatus());
    }
    return Promise.reject(error);
  },
);

export type AsyncAction<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Action>;

export { api };
export default store;
