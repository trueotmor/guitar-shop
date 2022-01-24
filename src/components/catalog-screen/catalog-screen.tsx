import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuitarsAction, fetchGuitarsPriceAction } from '../../store/catalog/catalog-api';
import ProductList from './components/products-list/products-list';
import {
  getFetchStatus,
  getFilterPrice,
  getGuitars,
  getGuitarsCount,
  getSortOrder,
  getSortType
} from '../../store/catalog/catalog-selectors';
import CatalogSorting from './components/catalog-sorting/catalog-sorting';
import CatalogFiltering from './components/catalog-filtering/catalog-filtering';
import CatalogPagination from './components/catalog-pagination/catalog-pagination';
import CatalogBreadcrumbs from './components/catalog-breadcrumbs/catalog-breadcrumbs';
import { useQuery } from '../../hooks/use-query';
import { useParams } from 'react-router-dom';
import { AppRoute, NavigateRoute, QueryRoute } from '../../consts/app-routes';
import { paginationData } from '../../consts/pagination-data';
import { getFullDataQuery, getNavigateQuery, getQuery, getResultFilterSortParams } from '../../utils/get-query';
import LoadingWrapper from '../common/loading-wrapper/loading-wrapper';

function CatalogScreen(): JSX.Element {
  const dispatch = useDispatch();
  const guitars = useSelector(getGuitars);
  const fetchStatus = useSelector(getFetchStatus);
  const guitarsCount = useSelector(getGuitarsCount);

  const searchParams = useQuery();
  const { query } = useParams<{ query: string }>();
  const currentPage = +query;

  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);
  const filterPrice = useSelector(getFilterPrice);

  const allTypes = searchParams.getAll(NavigateRoute.Type);
  const allStrings = searchParams.getAll(NavigateRoute.StringCount);

  const typeParams = getQuery(QueryRoute.Type, allTypes);
  const stringsParams = getQuery(QueryRoute.Strings, allStrings);

  const filterSortParams = getResultFilterSortParams(filterPrice, sortType, sortOrder, typeParams, stringsParams);

  const fullDataQuery = getFullDataQuery(filterSortParams, currentPage);
  const pricesQuery = [QueryRoute.SortPrice, typeParams, stringsParams].join('');

  const navigateQuery = getNavigateQuery(AppRoute.Catalog, currentPage, filterSortParams);

  useEffect(() => {
    dispatch(fetchGuitarsAction(fullDataQuery));
    dispatch(fetchGuitarsPriceAction(pricesQuery));
  }, [fullDataQuery, dispatch, pricesQuery, navigateQuery]);

  return (
    <>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <CatalogBreadcrumbs />
      <div className="catalog">
        <CatalogFiltering />
        <CatalogSorting />
        <LoadingWrapper fetchStatus={fetchStatus}>
          <>
            <ProductList guitars={guitars} />
            {guitarsCount > paginationData.guitarsOnPage && <CatalogPagination guitarsCount={guitarsCount} />}
          </>
        </LoadingWrapper>
      </div>
    </>
  );
}

export default memo(CatalogScreen);
