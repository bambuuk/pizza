import FoodItem from '../FoodItem/FoodItem';
import './foodList.scss';

const FoodList = () => {
  return (
    <div className="food-list">
      <div className="food-items">
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
      </div>
    </div>
  )
}

export default FoodList;