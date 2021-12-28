import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from '../../consts/consts';
import SliceNames from '../../consts/slice-names';

const initialState = {
  guitars: [],
  guitarsFetchStatus: FetchStatus.Fetched,
};

const catalogSlice = createSlice({
  name: SliceNames.Catalog,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    setFetchStatus: (state, action) => {
      state.guitarsFetchStatus = action.payload;
    },
  },
});

export const catalogReducer = catalogSlice.reducer;
export const { loadGuitars, setFetchStatus } = catalogSlice.actions;
