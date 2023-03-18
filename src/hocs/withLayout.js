import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const withLayout = (BaseComponent, nameComponent) => {
  const fixedHeader = nameComponent === 'MainPage' ? false : true;
  
  return function WithLayout() {
    return (
      <div className="wrapper">
        <Header fixedHeader={fixedHeader} />
        <main>
          <BaseComponent />
        </main>
        <Footer />
      </div>
    );
  };
};

export default withLayout;