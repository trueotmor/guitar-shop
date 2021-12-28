import { FetchStatus } from '../consts/consts';
import { RootState } from '../store/root-reducer';
import { Guitars } from './guitars';

export type State = RootState;

export type CatalogData = {
  guitars: Guitars;
  guitarsFetchStatus: FetchStatus;
};
