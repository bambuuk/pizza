import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue, } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { foodFetching, foodFetched, foodFetchingError } from '../../store/foodSlice';

import FoodItem from '../FoodItem/FoodItem';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import img from '../../resources/img/pizza/akvamen.png';
import './foodList.scss';

const FoodList = () => {
  const dispatch = useDispatch();
  const foodItemList = useSelector(state => state.food.filteredFoodList);
  const loadingStatus = useSelector(state => state.food.foodLoadingStatus);
  const [shoppingBag, setShoppingBag] = useState(false);

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
  const errorShow = loadingStatus === 'error' ? <ErrorMessage /> : null;
  const activeStyleBasket = shoppingBag ? 'basket_hidden' : 'basket_show';
  const activeStyleShopBag = shoppingBag ? 'order-list_show' : 'order-list_hidden';

  return (
    <div className="food-list">
      <div className={`basket_wrapper basket ${activeStyleBasket}`} onClick={onActiveShopBag}>
        <div className="basket__img"></div>
        <div className="basket__counter">1</div>
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
              <div className="order-list__product-item">
                <div className="order-list__img">
                  <img src={img} alt="" />
                </div>
                <div className="order-list__descr">
                  <div className="order-list__subtitle">SoloWay White SoloWay WhitE SoloWay WhitE SoloWay Whit SoloWay Whit</div>
                  <div className="order-list__features">Розмір</div>
                </div>
                <div className="order-list__counter">
                  <div className="order-list__minus order-list__sign">
                    <span></span>
                  </div>
                  <span className="order-list__qty">1</span>
                  <div className="order-list__plus order-list__sign">
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="order-list__amount">585 грн</div>
                <div className="order-list__sign order-list__del-product">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="order-list__total-amount">Сума: 585 грн</div>
            <div className="order-list__form order-form">
              <form action="">

                <div className="order-form__enterInfo">
                  <label className="order-form__usualLabel" htmlFor="name">Як до Вас звертатися:</label>
                  <input className="order-form__usualInput" id="name" name="customer name" type="text" required />
                </div>

                <div className="order-form__enterInfo">
                  <label className="order-form__usualLabel" htmlFor="phone-number">Номер телефону:</label>
                  <input className="order-form__usualInput" id="phone-number" name="customer phone number" type="tel" required/>
                </div>

                <div className="order-form__enterInfo">
                  <div className="order-form__subtitle">Варіанти доставки:</div>
                  <p className="order-form__radio">
                    <input type="radio" name="typeOfDelivery" id="deliveryAroundCity" value="Доставка по місту до 8 км 50 гривень"/>
                    <label htmlFor="deliveryAroundCity">Доставка по місту до 8 км 50 гривень</label>
                  </p>
                  <p className="order-form__radio">
                    <input type="radio" name="typeOfDelivery" id="pickup" value="Самовивіз за адресою вул. Пашутинська 61/84"/>
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
                    <input type="radio" name="typeOfPayment" id="cash" value="Готівкою при отриманні"/>
                    <label htmlFor="cash">Готівкою при отриманні</label>
                  </p>
                  <p className="order-form__radio">
                    <input type="radio" name="typeOfPayment" id="online" value="Онлайн карткою Visa або Mastercard"/>
                    <label htmlFor="online">Онлайн карткою Visa або Mastercard</label>
                  </p>
                </div>
                
                <div className="order-form__orderAmount">
                  <div className="order-form__amount">Сума: 640грн</div>
                  <div className="order-form__deliveryAmount">Доставка по місту до 8 км 50 гривень: 50грн</div>
                  <div className="order-form__totalAmount">Загальна сума: 690грн</div>
                </div>

                <button className="order-form__orderBtn">Замовити</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="food-items">
        {content}
      </div>
      {spinnerShow}
      {errorShow}
    </div>
  )
}

export default FoodList;