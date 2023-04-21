import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import FoodFilters from "../../components/FoodFilters/FoodFilters";
import FoodList from "../../components/FoodList/FoodList";
import withLayout from "../../hocs/withLayout";
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const MainPage = () => {
  return (
    <HelmetProvider>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Helmet>
          <meta
            name="description"
            content='Grilla Pizza - Новий Паб Кропивницького. Крафтова піца, від якої робиш "Умммм", 
            авторські бургери, хрусткі крильця, та пиво. Завжди привітний колектив. Історичний центр міста, глибоко під землею, у 
            безпеці та затишній атмосфері - Ваш GRILLA Pizza'
          />
          <title>Grilla Pizza</title>
        </Helmet>
        <FoodFilters />
        <ErrorBoundary>
          <FoodList />
        </ErrorBoundary>
      </motion.main>
    </HelmetProvider>
  )
}

export default withLayout(MainPage, 'MainPage');