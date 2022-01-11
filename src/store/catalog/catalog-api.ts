import { FetchStatus } from '../../consts/consts';
import { ServerRoute } from '../../consts/server-settings';
import { FetchGuitarsParams } from '../../types/fetch-guitars-params';
import { Guitars } from '../../types/guitars';
import { AsyncAction } from '../store';
import { loadGuitars, setFetchStatus } from './catalog-data';

const fetchGuitarsAction = (params: FetchGuitarsParams): AsyncAction => {
  const { nameLike, sortType, sortOrder, comments } = params;
  console.log(params);
  const searchParams = new URLSearchParams();
  console.log(sortType);
  nameLike && searchParams.append('name_like', nameLike);
  comments && searchParams.append('_embed', 'comments');
  sortType && searchParams.append('_sort', sortType);
  sortOrder && searchParams.append('_order', sortOrder);
  console.log(searchParams);

  return async (dispatch, _getState, api) => {
    try {
      dispatch(setFetchStatus(FetchStatus.Fetching));
      const { data } = await api.get<Guitars>(ServerRoute.Guitars, {
        params: {
          ...searchParams,
        },
      });
      dispatch(loadGuitars(data));
      dispatch(setFetchStatus(FetchStatus.Fetched));
      return Promise.resolve();
    } catch (error) {
      dispatch(setFetchStatus(FetchStatus.Error));
      return Promise.reject();
    }
  };
};

export { fetchGuitarsAction };
