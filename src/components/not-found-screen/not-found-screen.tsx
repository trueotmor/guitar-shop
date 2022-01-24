import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts/app-routes';

function NotFoundScreen() {
  return (
    <>
      <h1>Error 404</h1>
      <h2>The page you are looking can not be found</h2>
      <Link to={AppRoute.Main}>
        <p>Go back to the main page</p>
      </Link>
    </>
  );
}

export default NotFoundScreen;
