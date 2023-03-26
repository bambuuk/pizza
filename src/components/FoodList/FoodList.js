import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { foodFetching, foodFetched, foodFetchingError } from '../../store/foodSlice';

import FoodItem from '../FoodItem/FoodItem';
import './foodList.scss';

const FoodList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(foodFetching());
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
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