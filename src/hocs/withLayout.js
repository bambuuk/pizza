import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const withLayout = (BaseComponent) => {
  return function WithLayout() {
    return (
      <div className="wrapper">
        <Header />
        <main>
          <BaseComponent />
        </main>
        <Footer />
      </div>
    );
  };
};

export default withLayout;