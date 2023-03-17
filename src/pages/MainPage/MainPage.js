import FoodFilters from "../../components/FoodFilters/FoodFilters";
import FoodList from "../../components/FoodList/FoodList";
import withLayout from "../../hocs/withLayout";

const MainPage = () => {
  return (
    <>
      <FoodFilters />
      <FoodList />
    </>
  )
}

export default withLayout(MainPage);