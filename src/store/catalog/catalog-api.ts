import { QueryRoute } from '../../consts/app-routes';
import { FetchStatus } from '../../consts/consts';
import { GUITARS_COUNT_FROM_HEADERS } from '../../consts/guitar-data';
import { ServerRoute } from '../../consts/server-settings';
import { Guitars } from '../../types/guitars';
import { AsyncAction } from '../store';
import { loadGuitars, loadGuitarsPrices, setFetchStatus, setGuitarsCount, setPricesFetchStatus } from './catalog-data';

const fetchGuitarsAction = (params: string, comments = true): AsyncAction => {
  const query = `${ServerRoute.Guitars}?${comments && QueryRoute.CommentsEmbed}${params}`;

  return async (dispatch, _getState, api) => {
    try {
      dispatch(setFetchStatus(FetchStatus.Fetching));
      const { data, headers } = await api.get<Guitars>(query);

      dispatch(setGuitarsCount(+headers[GUITARS_COUNT_FROM_HEADERS]));
      dispatch(loadGuitars(data));
    } catch (error) {
      dispatch(setFetchStatus(FetchStatus.Error));
    }
  };
};

const fetchGuitarsPriceAction = (params: string): AsyncAction => {
  const query = `${ServerRoute.Guitars}?${params}`;
  return async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Guitars>(query);
      dispatch(loadGuitarsPrices(data));
    } catch {
      dispatch(setPricesFetchStatus(FetchStatus.Error));
    }
  };
};

export { fetchGuitarsAction, fetchGuitarsPriceAction };
