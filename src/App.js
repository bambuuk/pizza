import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer';
import FoodFilters from './components/FoodFilters/FoodFilters';
import './style/style.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <FoodFilters />
      </main>
      <Footer />
    </div>
  );
}

export default App;
