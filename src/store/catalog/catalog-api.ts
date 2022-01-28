import { QueryRoute } from '../../consts/app-routes';
import { FetchStatus } from '../../consts/consts';
import { GUITARS_COUNT_FROM_HEADERS } from '../../consts/guitar-data';
import {
  ERROR_403_MESSAGE,
  ERROR_404_MESSAGE,
  ERROR_MESSAGE,
  HttpCode,
  ServerRoute
} from '../../consts/server-settings';
import { Guitars } from '../../types/guitars';
import { AsyncAction } from '../store';
import { loadGuitars, loadGuitarsPrices, setFetchStatus, setGuitarsCount, setPricesFetchStatus } from './catalog-data';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const fetchGuitarsAction = (params: string, comments = true): AsyncAction => {
  const query = `${ServerRoute.Guitars}?${comments && QueryRoute.CommentsEmbed}${params}`;

  return async (dispatch, _getState, api) => {
    try {
      dispatch(setFetchStatus(FetchStatus.Fetching));
      const { data, headers } = await api.get<Guitars>(query);

      dispatch(setGuitarsCount(+headers[GUITARS_COUNT_FROM_HEADERS]));
      dispatch(loadGuitars(data));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === HttpCode.Forbidden) {
        toast.error(ERROR_403_MESSAGE);
      } else if (axiosError.response?.status === HttpCode.NotFound) {
        toast.error(ERROR_404_MESSAGE);
      } else {
        toast.error(ERROR_MESSAGE);
      }
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
