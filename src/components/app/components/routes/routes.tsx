import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundScreen from '../../../not-found-screen/not-found-screen';
import { AppRoute } from '../../../../consts/app-routes';
import CatalogScreen from '../../../catalog-screen/catalog-screen';
import MainScreen from '../../../main-screen/main-screen';

function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path={`${AppRoute.Main}`}>
        <MainScreen />
      </Route>
      <Route exact path={`${AppRoute.Catalog}${AppRoute.Page}`}>
        <CatalogScreen />
      </Route>
      <Route exact path={`${AppRoute.Catalog}${AppRoute.Page}:query`}>
        <CatalogScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
      <Redirect exact from={AppRoute.Main} to={`${AppRoute.Catalog}${AppRoute.Page}`} />
    </Switch>
  );
}

export default Routes;
