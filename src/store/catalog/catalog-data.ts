import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, SortOrder, SortType } from '../../consts/consts';
import SliceNames from '../../consts/slice-names';

const initialState = {
  guitars: [],
  guitarsCount: 0,
  guitarsFetchStatus: FetchStatus.Fetched,
  sortType: SortType.Default,
  sortOrder: SortOrder.Default,
  guitarsPrices: [],
  filterPricesFetchStatus: FetchStatus.Fetching,
  filterType: [],
  filterStrings: [],
  filterPrice: { minPrice: '', maxPrice: '' },
  currentCatalogPage: null,
};

const catalogSlice = createSlice({
  name: SliceNames.Catalog,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.guitarsFetchStatus = FetchStatus.Fetched;
    },

    loadGuitarsPrices: (state, action) => {
      state.guitarsPrices = action.payload;
      state.filterPricesFetchStatus = FetchStatus.Fetched;
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

    setPricesFetchStatus: (state, action) => {
      state.filterPricesFetchStatus = action.payload;
    },

    changeFilterType: (state, action) => {
      state.filterType = action.payload;
    },

    changeFilterStrings: (state, action) => {
      state.filterStrings = action.payload;
    },

    changeFilterPrice: (state, action) => {
      state.filterPrice = action.payload;
    },

    changeCatalogPage: (state, action) => {
      state.currentCatalogPage = action.payload;
    },

    setGuitarsCount: (state, action) => {
      state.guitarsCount = action.payload;
    },
  },
});

export const catalogReducer = catalogSlice.reducer;
export const {
  loadGuitars,
  loadGuitarsPrices,
  setFetchStatus,
  changeSortType,
  changeSortOrder,
  setPricesFetchStatus,
  changeFilterType,
  changeFilterPrice,
  changeFilterStrings,
  changeCatalogPage,
  setGuitarsCount,
} = catalogSlice.actions;
