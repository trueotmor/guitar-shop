import { FetchStatus } from '../../consts/consts';
import { ServerRoute } from '../../consts/server-settings';
import { Guitars } from '../../types/guitars';
import { AsyncAction } from '../store';
import { loadGuitars, setFetchStatus } from './catalog-data';

const fetchGuitarsAction = (): AsyncAction => async (dispatch, _getState, api) => {
  try {
    dispatch(setFetchStatus(FetchStatus.Fetching));
    const { data } = await api.get<Guitars>(ServerRoute.Guitars);
    dispatch(loadGuitars(data));
    dispatch(setFetchStatus(FetchStatus.Fetched));
    return Promise.resolve();
  } catch (error) {
    dispatch(setFetchStatus(FetchStatus.Error));
    return Promise.reject();
  }
};

export { fetchGuitarsAction };
