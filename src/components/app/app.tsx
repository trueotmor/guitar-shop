import Footer from './components/footer/footer';
import Header from './components/header/header';
import Routes from './components/routes/routes';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <Routes />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
