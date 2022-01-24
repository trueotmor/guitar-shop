import { memo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortOrder, getSortType } from '../../../../store/catalog/catalog-selectors';
import classNames from 'classnames';
import { sortBtnsData, SortOrder, SortType } from '../../../../consts/consts';
import { changeSortOrder, changeSortType } from '../../../../store/catalog/catalog-data';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../../../../hooks/use-query';
import { NavigateRoute } from '../../../../consts/app-routes';
import styles from './catalog-sorting.module.scss';

function CatalogSorting(): JSX.Element {
  const dispatch = useDispatch();
  const currentSortType = useSelector(getSortType);
  const currentSortOrder = useSelector(getSortOrder);
  const history = useHistory();
  const query = useQuery();

  const onSortTypeClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const sortType = evt.currentTarget.dataset.type;
    if (!sortType) {
      return;
    }

    dispatch(changeSortType(sortType));

    query.set(NavigateRoute.Sort, sortType);
    if (currentSortOrder !== SortOrder.Default) {
      query.set(NavigateRoute.Order, currentSortOrder);
    }

    history.push({ pathname: NavigateRoute.StartPagePathname, search: query.toString() });
  };

  const onSortOrderClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const sortOrder = evt.currentTarget.dataset.order;
    if (!sortOrder) {
      return;
    }
    dispatch(changeSortOrder(sortOrder));

    query.set(NavigateRoute.Order, sortOrder);
    if (currentSortType !== SortType.Default) {
      query.set(NavigateRoute.Sort, currentSortType);
    }

    history.push({ pathname: NavigateRoute.StartPagePathname, search: query.toString() });
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {sortBtnsData.type.map(({ type, description }) => (
          <button
            className={classNames(
              'catalog-sort__type-button',
              `${currentSortType === type && 'catalog-sort__type-button--active'}`,
            )}
            key={type}
            aria-label={description}
            tabIndex={currentSortType === type ? -1 : 0}
            data-type={type}
            onClick={onSortTypeClick}
          >
            {description}
          </button>
        ))}
      </div>
      <div className="catalog-sort__order">
        {sortBtnsData.order.map(({ order, description }) => (
          <button
            className={classNames(
              `${styles['catalog-sort__order-mybutton']}`,
              `${
                order === SortOrder.SortUp
                  ? `${styles['catalog-sort__order-mybutton--up']}`
                  : `${styles['catalog-sort__order-mybutton--down']}`
              }`,
              `${currentSortOrder === order ? `${styles['catalog-sort__order-mybutton--active']}` : ''}`,
            )}
            key={order}
            aria-label={description}
            tabIndex={currentSortOrder === order ? -1 : 0}
            data-order={order}
            onClick={onSortOrderClick}
            disabled={currentSortType === SortType.Default}
          >
            {}
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(CatalogSorting);
