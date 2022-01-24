import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../consts/app-routes';

function CatalogBreadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Main}>
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Catalog}>
          Каталог
        </Link>
      </li>
    </ul>
  );
}

export default memo(CatalogBreadcrumbs);
