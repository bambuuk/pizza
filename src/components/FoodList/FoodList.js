import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { foodFetching, foodFetched, foodFetchingError } from '../../store/foodSlice';

import FoodItem from '../FoodItem/FoodItem';
import Spinner from '../Spinner/Spinner';
import './foodList.scss';

const FoodList = () => {
  const dispatch = useDispatch();
  const foodItemList = useSelector(state => state.food.foodList);
  const loadingStatus = useSelector(state => state.food.foodLoadingStatus);
  // console.log(foodItemList, loadingStatus);

  useEffect(() => {
    dispatch(foodFetching());
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      let arrOfFood = [];
      if (data != null) {
        Object.values(Object.values(data)[0]).forEach((todo) => {
          arrOfFood.push(todo);
        });
        dispatch(foodFetched(arrOfFood));
      } else {
        dispatch(foodFetchingError());
      }
    });
    // eslint-disable-next-line
  }, []);

  const content = foodItemList.map(item => {
    return <FoodItem key={item.id} data={item} />
  });
  
  const spinnerShow = loadingStatus === 'loading' ? <Spinner /> : null;

  return (
    <div className="food-list">
      <div className="food-items">
        {content}
      </div>
      {spinnerShow}
    </div>
  )
}

export default FoodList;