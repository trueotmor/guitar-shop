import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, SortOrder, SortType } from '../../consts/consts';
import SliceNames from '../../consts/slice-names';

const initialState = {
  guitars: [],
  guitarsFetchStatus: FetchStatus.Fetched,
  sortType: SortType.Default,
  sortOrder: SortOrder.Default,
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

    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },

    changeSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const catalogReducer = catalogSlice.reducer;
export const { loadGuitars, setFetchStatus, changeSortType, changeSortOrder } =
  catalogSlice.actions;
