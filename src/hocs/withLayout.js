import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const withLayout = (BaseComponent, nameComponent) => {
  const fixedHeader = nameComponent === 'MainPage' ? false : true;
  
  return function WithLayout() {
    return (
      <div className="wrapper">
        <Header fixedHeader={fixedHeader} />
          <BaseComponent />
        <Footer />
      </div>
    );
  };
};

export default withLayout;