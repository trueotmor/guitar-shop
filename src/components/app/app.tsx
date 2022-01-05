import { Routes, Route } from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import Footer from '../footer/footer';
import Header from '../header/header';
import NotFoundPage from '../not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<CatalogScreen />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
