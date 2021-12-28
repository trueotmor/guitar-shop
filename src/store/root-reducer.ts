import { combineReducers } from '@reduxjs/toolkit';
import SliceNames from '../consts/slice-names';
import { catalogReducer } from './catalog/catalog-data';

export const rootReducer = combineReducers({
  [SliceNames.Catalog]: catalogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
