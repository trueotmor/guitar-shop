import { FetchStatus, SortOrder, SortType } from '../consts/consts';
import { RootState } from '../store/root-reducer';
import { Guitars } from './guitars';

export type State = RootState;

export type FilterPrice = { minPrice: string; maxPrice: string };

export type CatalogData = {
  guitars: Guitars;
  guitarsFetchStatus: FetchStatus;
  filterPriceFetchStatus: FetchStatus;
  sortType: SortType;
  sortOrder: SortOrder;
  guitarsPrices: Guitars;
  filterPricesFetchStatus: FetchStatus;
  filterType: [];
  filterStrings: [];
  filterPrice: FilterPrice;
  currentCatalogPage: number;
};
