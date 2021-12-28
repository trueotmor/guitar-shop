import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { AxiosConfig } from '../consts/server-settings';
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

export type AsyncAction<R = Promise<void>> = ThunkAction<
  R,
  RootState,
  AxiosInstance,
  Action
>;

export { api };
export default store;
