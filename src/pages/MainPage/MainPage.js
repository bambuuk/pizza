import { motion } from 'framer-motion';

import FoodFilters from "../../components/FoodFilters/FoodFilters";
import FoodList from "../../components/FoodList/FoodList";
import withLayout from "../../hocs/withLayout";

const MainPage = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FoodFilters />
        <FoodList />
      </motion.main>
    </>
  )
}

export default withLayout(MainPage, 'MainPage');