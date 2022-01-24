import { Link, useHistory, useParams } from 'react-router-dom';
import { memo, MouseEvent, useEffect, useState } from 'react';
import { paginationData } from '../../../../consts/pagination-data';
import { useQuery } from '../../../../hooks/use-query';
import { NavigateRoute, AppRoute } from '../../../../consts/app-routes';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage } from '../../../../store/catalog/catalog-selectors';
import { changeCatalogPage } from '../../../../store/catalog/catalog-data';

type CatalogPaginationProps = {
  guitarsCount: number;
};

function CatalogPagination({ guitarsCount }: CatalogPaginationProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const urlQuery = useQuery();
  const { query } = useParams<{ query: string }>();
  const pageFromStore = useSelector(getCurrentPage);
  const { guitarsOnPage, buttons, startStep, startPage } = paginationData;
  const currentPage = pageFromStore || startPage || +query;
  const [step, setStep] = useState(startStep);

  const pagesCount = Math.ceil(guitarsCount / guitarsOnPage);

  const sectionPages = new Array(buttons)
    .fill(null)
    .map((_value, index) => buttons * (step - 1) + index + 1)
    .filter((pageItem) => pageItem <= pagesCount);

  const onPageNumberClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    dispatch(changeCatalogPage(+evt.currentTarget.innerText));
  };

  const onPrevClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    if (currentPage % buttons === 1) {
      setStep((prevStep) => prevStep - 1);
    }
    dispatch(changeCatalogPage(currentPage - 1));
  };

  const onNextClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    if (currentPage % buttons === 0) {
      setStep((prevStep) => prevStep + 1);
    }
    dispatch(changeCatalogPage(currentPage + 1));
  };

  useEffect(() => {
    history.push({ pathname: `${NavigateRoute.PagePathname}${currentPage}`, search: urlQuery.toString() });
  }, [history, urlQuery, currentPage]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage !== startPage && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link className="link pagination__page-link" to="/" onClick={onPrevClick}>
              Назад
            </Link>
          </li>
        )}
        {sectionPages.map((pageNumber) => (
          <li
            className={`pagination__page ${pageNumber === currentPage ? 'pagination__page--active' : ''}`}
            key={pageNumber}
          >
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.Catalog}${pageNumber}`}
              onClick={onPageNumberClick}
              data-testid={`page ${pageNumber}`}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        {currentPage !== pagesCount && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="/" onClick={onNextClick}>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default memo(CatalogPagination);
