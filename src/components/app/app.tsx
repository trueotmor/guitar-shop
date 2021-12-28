import { Routes, Route } from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import NotFoundPage from '../not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <div className="container">
        <Routes>
          <Route path="/" element={<CatalogScreen />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
