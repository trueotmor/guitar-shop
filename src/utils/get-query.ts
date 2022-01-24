import { QueryRoute } from '../consts/app-routes';
import { SortOrder, SortType } from '../consts/consts';
import { paginationData } from '../consts/pagination-data';
import { FilterPrice } from '../types/state';

const getPageParams = (page: number): string =>
  `&_start=${(page - 1) * paginationData.guitarsOnPage}&_limit=${paginationData.guitarsOnPage}`;

const getSortParams = (type: string, order: string): string => {
  if (!(type && order)) {
    return '';
  }
  const orderString = order === SortOrder.SortUp ? '' : '&_order=desc';
  return `&_sort=${type}${orderString}`;
};

const getPriceParams = (range: FilterPrice): string => {
  const { minPrice, maxPrice } = range;
  const minQuery = minPrice !== '' ? `${QueryRoute.MinPrice}${minPrice}` : '';
  const maxQuery = maxPrice !== '' ? `${QueryRoute.MaxPrice}${maxPrice}` : '';
  return minQuery + maxQuery;
};

const getQuery = (query: string, state: string[]): string => {
  const result = state.length ? state.map((item) => `${query}${item}`).join('') : '';

  return result;
};

const getResultFilterSortParams = (
  price: FilterPrice,
  sortType: SortType,
  sortOrder: SortOrder,
  type: string,
  strings: string,
): string => {
  const priceQuery = getPriceParams(price);
  const sortQuery = getSortParams(sortType, sortOrder);
  return priceQuery + type + strings + sortQuery;
};

const getNavigateQuery = (route: string, page: number, params: string): string => {
  const prefix = params.length ? '?' : '';
  return route + page + prefix + params;
};

const getFullDataQuery = (params: string, page: number): string => {
  const pageParams = getPageParams(page);
  return params + pageParams;
};

export { getQuery, getNavigateQuery, getResultFilterSortParams, getFullDataQuery };
