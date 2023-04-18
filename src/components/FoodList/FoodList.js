import { useEffect, useState, useMemo } from 'react';
import { db } from '../../firebase';
import { ref, onValue, } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { foodFetching, foodFetched, foodFetchingError } from '../../store/foodSlice';
import FoodItem from '../FoodItem/FoodItem';
import ShoppingBag from '../ShoppingBag/ShoppingBag';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './foodList.scss';

const FoodList = () => {
  const dispatch = useDispatch();
  const foodItemList = useSelector(state => state.food.filteredFoodList);
  const loadingStatus = useSelector(state => state.food.foodLoadingStatus);
  const totalFoodPosition = localStorage.getItem('totalFoodPosition') ? JSON.parse(localStorage.getItem('totalFoodPosition')) : null;
  const shopBagFoodData = localStorage.getItem('foodData') ? JSON.parse(localStorage.getItem('foodData')) : null;

  const [activeShoppingBag, setActiveShoppingBag] = useState(false);
  const [totalOrderAmount, setTotalOrderAmount] = useState(totalFoodPosition);
  const [foodListInShopBag, setFoodListInShopBag] = useState(shopBagFoodData);
  const [activeStyleBasket, setActiveStyleBasket] = useState('basket_hidden');
  const [activeStyleShopBag, setActiveStyleShopBag] = useState('order-list_hidden');

  const onActiveShopBag = (e, action) => {
    if (e) {
      let clName = e.target.className;
      if (
        clName === 'basket__img' || 
        clName === 'order-list__close-btn' ||
        clName === 'order-list_overlay' ||
        e.target.parentElement.className === 'order-list__close-btn'
      ) {
        setActiveShoppingBag(shoppingBag => !shoppingBag);
        document.body.classList.toggle('no-scroll');
      } 
    } else if (action === 'ordered-food') {
      console.log('da');
      setActiveShoppingBag(false);
      document.body.classList.toggle('no-scroll');
    }
  }

  const onChangeTotalOrderAmount = (value) => {
    setTotalOrderAmount(value);
  }

  const onChangeFoodListInShopBag = (value) => {
    setFoodListInShopBag(value);
  }

  const onCounterShopBag = (id, sign) => {
    let newFoodListInShopBag = [];
    let newTotalFoodPosition = 0;
    if (sign === 'dec') {
      newFoodListInShopBag = foodListInShopBag.map(
        item => item.id === id ? { ...item, counter: +item.counter - 1 } : item
      ).filter(item => +item.counter > 0);

      newTotalFoodPosition = totalFoodPosition - 1;
    } else if (sign === 'inc') {
      newFoodListInShopBag = foodListInShopBag.map(
        item => item.id === id ? { ...item, counter: +item.counter + 1 } : item
      );

      newTotalFoodPosition = totalFoodPosition + 1;
    } else if (sign === 'del') {
      let delProductCount = 0;
      foodListInShopBag.forEach(item => {
        if (item.id === id) {
          delProductCount = item.counter;
        }
      });

      newTotalFoodPosition = totalFoodPosition - delProductCount;
      newFoodListInShopBag = foodListInShopBag.filter(item => item.id !== id);
    }

    if (newTotalFoodPosition === 0) {
      setActiveShoppingBag(shoppingBag => !shoppingBag);
    }

    localStorage.setItem('foodData', JSON.stringify(newFoodListInShopBag));
    localStorage.setItem('totalFoodPosition', JSON.stringify(newTotalFoodPosition));
    setFoodListInShopBag(newFoodListInShopBag);
    setTotalOrderAmount(newTotalFoodPosition);
  }

  const contentFoodList = foodItemList.map(item => {
    return <CSSTransition key={item.id} timeout={300} classNames="food-list">
      <FoodItem
        data={item}
        onChangeTotalOrderAmount={onChangeTotalOrderAmount}
        onChangeFoodListInShopBag={onChangeFoodListInShopBag}
      />
    </CSSTransition>
  });

  const onUpdShowingShopBagAndBasket = () => {
    if (totalOrderAmount < 1 || activeShoppingBag) {
      setActiveStyleBasket('basket_hidden');
    } else if (totalOrderAmount > 0 || activeShoppingBag === false) {
      setActiveStyleBasket('basket_show');
    }
    
    if (foodListInShopBag) {
      if (foodListInShopBag.length > 0 && activeShoppingBag) {
        setActiveStyleShopBag('order-list_show');
      } else {
        setActiveStyleShopBag('order-list_hidden');
        document.body.classList.remove('no-scroll');
      }
    }
  };

  const orderSum = useMemo(() => {
    let sum = 0;
    if (foodListInShopBag) {
      foodListInShopBag.forEach(item => {
        sum += (+item.price) * (+item.counter);
      })
    }
    return sum;
  }, [foodListInShopBag]);

  useEffect(() => {
    onUpdShowingShopBagAndBasket();
    // eslint-disable-next-line
  }, [totalOrderAmount, activeShoppingBag, foodListInShopBag]);

  useEffect(() => {
    onUpdShowingShopBagAndBasket();

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

  const spinnerShow = loadingStatus === 'loading' ? <Spinner /> : null;
  const errorShow = loadingStatus === 'error' ? <ErrorMessage /> : null;

  return (
    <div className="food-list">
      <div className={`basket_wrapper basket ${activeStyleBasket}`} onClick={onActiveShopBag}>
        <div className="basket__img"></div>
        <div className="basket__counter">{totalFoodPosition}</div>
      </div>

      <ShoppingBag
        activeStyleShopBag={activeStyleShopBag}
        onActiveShopBag={onActiveShopBag}
        orderSum={orderSum}
        foodListInShopBag={foodListInShopBag}
        onCounterShopBag={onCounterShopBag}
        onChangeFoodListInShopBag={onChangeFoodListInShopBag}
        onChangeTotalOrderAmount={onChangeTotalOrderAmount}
        totalOrderAmount={totalOrderAmount}
      />

      {
        loadingStatus === 'idle' ?
          <TransitionGroup component="div" className="food-items">
            {contentFoodList}
          </TransitionGroup> :
          null
      }
      {spinnerShow}
      {errorShow}
    </div>
  )
}

export default FoodList;