import { FetchStatus, SortOrder, SortType } from '../../consts/consts';
import SliceNames from '../../consts/slice-names';
import { Guitars } from '../../types/guitars';
import { FilterPrice, State } from '../../types/state';

export const getGuitars = (state: State): Guitars => state[SliceNames.Catalog].guitars;
export const getFetchStatus = (state: State): FetchStatus => state[SliceNames.Catalog].guitarsFetchStatus;
export const getSortType = (state: State): SortType => state[SliceNames.Catalog].sortType;
export const getSortOrder = (state: State): SortOrder => state[SliceNames.Catalog].sortOrder;
export const getGuitarsPrices = (state: State): Guitars => state[SliceNames.Catalog].guitarsPrices;
export const getPricesFetchStatus = (state: State): FetchStatus => state[SliceNames.Catalog].filterPricesFetchStatus;
export const getCurrentPage = (state: State): number | null => state[SliceNames.Catalog].currentCatalogPage;
export const getFilterPrice = (state: State): FilterPrice => state[SliceNames.Catalog].filterPrice;
export const getGuitarsCount = (state: State): number => state[SliceNames.Catalog].guitarsCount;
export const getServerErrorStatus = (state: State): boolean => state[SliceNames.Catalog].serverErrorStatus;
