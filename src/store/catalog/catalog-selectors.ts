import { FetchStatus, SortOrder, SortType } from '../../consts/consts';
import SliceNames from '../../consts/slice-names';
import { Guitars } from '../../types/guitars';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitars => state[SliceNames.Catalog].guitars;
export const getFetchStatus = (state: State): FetchStatus =>
  state[SliceNames.Catalog].guitarsFetchStatus;
export const getSortType = (state: State): SortType => state[SliceNames.Catalog].sortType;
export const getSortOrder = (state: State): SortOrder => state[SliceNames.Catalog].sortOrder;
