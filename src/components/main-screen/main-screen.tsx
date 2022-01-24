import { Redirect } from 'react-router-dom';
import { AppRoute } from '../../consts/app-routes';

function MainScreen(): JSX.Element {
  return <Redirect to={`${AppRoute.Catalog}${AppRoute.Page}`} />;
}

export default MainScreen;
