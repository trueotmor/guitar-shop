import { Guitars } from '../types/guitars';
import { FetchGuitarsParams } from '../types/fetch-guitars-params';
import api from './api';
import { ServerRoute } from '../consts/server-settings';

export const fetchGuitars = async (params: FetchGuitarsParams): Promise<Guitars> => {
  const { data } = await api.get<Guitars>(ServerRoute.Guitars, {
    params: {
      'name_like': params.nameLike,
    },
  });

  return data;
};
