import { memo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortOrder, getSortType } from '../../../../store/catalog/catalog-selectors';
import classNames from 'classnames';
import { sortBtnsData, SortOrder } from '../../../../consts/consts';
import { changeSortOrder, changeSortType } from '../../../../store/catalog/catalog-data';

function CatalogSorting(): JSX.Element {
  const dispatch = useDispatch();
  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);

  const onSortTypeClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const currentType = evt.currentTarget.dataset.type;
    if (!currentType) {
      return;
    }
    dispatch(changeSortType(currentType));
  };

  const onSortOrderClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const currentOrder = evt.currentTarget.dataset.order;
    if (!currentOrder) {
      return;
    }
    dispatch(changeSortOrder(currentOrder));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {sortBtnsData.type.map(({ type, description }) => (
          <button
            className={classNames(
              'catalog-sort__type-button',
              `${sortType === type && 'catalog-sort__type-button--active'}`,
            )}
            key={type}
            aria-label={description}
            tabIndex={sortType === type ? -1 : 0}
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
              `${sortOrder === order && 'catalog-sort__order-button--active'}`,
            )}
            key={order}
            aria-label={description}
            tabIndex={sortOrder === order ? -1 : 0}
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
