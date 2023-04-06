import { useEffect, useState, useMemo } from 'react';
import { db } from '../../firebase';
import { ref, onValue, } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { foodFetching, foodFetched, foodFetchingError } from '../../store/foodSlice';
import FoodItem from '../FoodItem/FoodItem';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './foodList.scss';

const FoodList = () => {
  const dispatch = useDispatch();
  const foodItemList = useSelector(state => state.food.filteredFoodList);
  const loadingStatus = useSelector(state => state.food.foodLoadingStatus);
  const totalFoodPosition = localStorage.getItem('totalFoodPosition') ? JSON.parse(localStorage.getItem('totalFoodPosition')) : null;
  const shopBagFoodData = localStorage.getItem('foodData') ? JSON.parse(localStorage.getItem('foodData')) : null;

  const [shoppingBag, setShoppingBag] = useState(false);
  const [totalOrderAmount, setTotalOrderAmount] = useState(totalFoodPosition);
  const [foodListInShopBag, setFoodListInShopBag] = useState(shopBagFoodData);
  const [activeStyleBasket, setActiveStyleBasket] = useState('basket_hidden');
  const [activeStyleShopBag, setActiveStyleShopBag] = useState('order-list_hidden');
  // let activeStyleShopBag = useRef('order-list_hidden');

  const onActiveShopBag = (e) => {
    let clName = e.target.className;
    if (
      clName === 'basket__img' || clName === 'order-list__close-btn' ||
      clName === 'order-list_overlay' ||
      e.target.parentElement.className === 'order-list__close-btn'
    ) {
      setShoppingBag(shoppingBag => !shoppingBag);
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
      setShoppingBag(shoppingBag => !shoppingBag);
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

  const contentShopBagFoodList = foodListInShopBag !== null ? foodListInShopBag.map(({ img, name, price, size, weight, counter, id }) => {
    return (
      <CSSTransition key={id} timeout={300} classNames="food-list">
        <div  className="order-list__product-item">
          <div className="order-list__img">
            <img src={img} alt={name} />
          </div>
          <div className="order-list__descr">
            <div className="order-list__subtitle">{name}</div>
            {size ? <div className="order-list__features">Розмір - {size}{weight ? `, (${weight})` : null}</div> : null}
          </div>
          <div className="order-list__counter">
            <div className="order-list__minus order-list__sign" onClick={() => onCounterShopBag(id, 'dec')}>
              <span></span>
            </div>
            <span className="order-list__qty">{counter}</span>
            <div className="order-list__plus order-list__sign" onClick={() => onCounterShopBag(id, 'inc')}>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="order-list__amount">{price * (+counter)} грн</div>
          <div className="order-list__sign order-list__del-product" onClick={() => onCounterShopBag(id, 'del')}>
            <span></span>
            <span></span>
          </div>
        </div>
      </CSSTransition>
    );
  }) : null;

  const spinnerShow = loadingStatus === 'loading' ? <Spinner /> : null;
  const errorShow = loadingStatus === 'error' ? <ErrorMessage /> : null;

  const onUpdShowwingShopBagAndBasket = () => {
    if (totalOrderAmount < 1 || shoppingBag) {
      setActiveStyleBasket('basket_hidden');
    } else {
      setActiveStyleBasket('basket_show');
    }

    if (foodListInShopBag.length > 0 && shoppingBag) {
      setActiveStyleShopBag('order-list_show');
    } else {
      setActiveStyleShopBag('order-list_hidden');
      document.body.classList.remove('no-scroll');
    }
  };

  const orderSum = useMemo(() => {
    let sum = 0;
    foodListInShopBag.forEach(item => {
      sum += (+item.price) * (+item.counter);
    });
    return sum;
  }, [foodListInShopBag]);

  useEffect(() => {
    onUpdShowwingShopBagAndBasket();
    // eslint-disable-next-line
  }, [totalOrderAmount, shoppingBag, foodListInShopBag]);

  useEffect(() => {
    onUpdShowwingShopBagAndBasket();

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
  console.log('render')

  return (
    <div className="food-list">
      <div className={`basket_wrapper basket ${activeStyleBasket}`} onClick={onActiveShopBag}>
        <div className="basket__img"></div>
        <div className="basket__counter">{totalFoodPosition}</div>
      </div>

      <div className={`order-list ${activeStyleShopBag}`}>
        <div className="order-list_overlay" onClick={onActiveShopBag} >
          <div className="order-list__close">
            <button className="order-list__close-btn">
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="order-list__popup">
            <div className="order-list__title">Ваше замовлення:</div>
            <div className="order-list__products">
              <TransitionGroup component="div">
                {contentShopBagFoodList}
              </TransitionGroup>
            </div>
            <div className="order-list__total-amount">Сума: {orderSum} грн</div>
            <div className="order-list__form order-form">
              <form action="">

                <div className="order-form__enterInfo">
                  <label className="order-form__usualLabel" htmlFor="name">Як до Вас звертатися:</label>
                  <input className="order-form__usualInput" id="name" name="customer name" type="text" required />
                </div>

                <div className="order-form__enterInfo">
                  <label className="order-form__usualLabel" htmlFor="phone-number">Номер телефону:</label>
                  <input className="order-form__usualInput" id="phone-number" name="customer phone number" type="tel" required />
                </div>

                <div className="order-form__enterInfo">
                  <div className="order-form__subtitle">Варіанти доставки:</div>
                  <p className="order-form__radio">
                    <input type="radio" name="typeOfDelivery" id="deliveryAroundCity" value="Доставка по місту до 8 км 50 гривень" />
                    <label htmlFor="deliveryAroundCity">Доставка по місту до 8 км 50 гривень</label>
                  </p>
                  <p className="order-form__radio">
                    <input type="radio" name="typeOfDelivery" id="pickup" value="Самовивіз за адресою вул. Пашутинська 61/84" />
                    <label htmlFor="pickup">Самовивіз за адресою вул. Пашутинська 61/84</label>
                  </p>
                </div>

                <div className="order-form__enterInfo">
                  <label className="order-form__usualLabel" htmlFor="address">Адреса</label>
                  <input className="order-form__usualInput" id="address" name="delivery address" type="text" required />
                </div>

                <div className="order-form__enterInfo">
                  <label className="order-form__usualLabel" htmlFor="comment">Коментар</label>
                  <input className="order-form__usualInput" id="comment" name="customer comment" type="text" required />
                </div>

                <div className="order-form__enterInfo">
                  <div className="order-form__subtitle">Спосіб оплати:</div>
                  <p className="order-form__radio">
                    <input type="radio" name="typeOfPayment" id="cash" value="Готівкою при отриманні" />
                    <label htmlFor="cash">Готівкою при отриманні</label>
                  </p>
                  <p className="order-form__radio">
                    <input type="radio" name="typeOfPayment" id="online" value="Онлайн карткою Visa або Mastercard" />
                    <label htmlFor="online">Онлайн карткою Visa або Mastercard</label>
                  </p>
                </div>

                <div className="order-form__orderAmount">
                  <div className="order-form__amount">Сума: {orderSum} грн</div>
                  <div className="order-form__deliveryAmount">Доставка по місту до 8 км 50 гривень: 50грн</div>
                  <div className="order-form__totalAmount">Загальна сума: {orderSum} грн</div>
                </div>

                <button className="order-form__orderBtn">Замовити</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <TransitionGroup component="div" className="food-items">
        {contentFoodList}
      </TransitionGroup>
      {spinnerShow}
      {errorShow}
    </div>
  )
}

export default FoodList;