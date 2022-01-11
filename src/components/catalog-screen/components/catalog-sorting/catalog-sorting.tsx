import { memo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortOrder, getSortType } from '../../../../store/catalog/catalog-selectors';
import classNames from 'classnames';
import { sortBtnsData, SortOrder } from '../../../../consts/consts';
import { changeSortOrder, changeSortType } from '../../../../store/catalog/catalog-data';
import { fetchGuitarsAction } from '../../../../store/catalog/catalog-api';

function CatalogSorting(): JSX.Element {
  const dispatch = useDispatch();
  const currentSortType = useSelector(getSortType);
  const currentSortOrder = useSelector(getSortOrder);

  const onSortTypeClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const sortType = evt.currentTarget.dataset.type;
    if (!sortType) {
      return;
    }
    dispatch(changeSortType(sortType));
    dispatch(fetchGuitarsAction({ sortType }));
  };

  const onSortOrderClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const sortOrder = evt.currentTarget.dataset.order;
    if (!sortOrder) {
      return;
    }
    dispatch(changeSortOrder(sortOrder));
    dispatch(fetchGuitarsAction({ sortOrder }));
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
              'catalog-sort__order-button',
              `catalog-sort__order-button--${order === SortOrder.SortUp ? 'up' : 'down'}`,
              `${currentSortOrder === order && 'catalog-sort__order-button--active'}`,
            )}
            key={order}
            aria-label={description}
            tabIndex={currentSortOrder === order ? -1 : 0}
            data-order={order}
            onClick={onSortOrderClick}
          >
            {}
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(CatalogSorting);
