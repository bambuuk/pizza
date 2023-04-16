import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestoreDb, auth } from '../../firebase';

import Spinner from '../Spinner/Spinner';
import './shoppingBag.scss';

const ShoppingBag = (props) => {
  const {
    activeStyleShopBag,
    onActiveShopBag,
    orderSum,
    foodListInShopBag,
    onCounterShopBag,
    onChangeFoodListInShopBag,
    onChangeTotalOrderAmount,
    totalOrderAmount
  } = props;

  const [customerName, setCustomerName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerComment, setCustomerCommet] = useState('');
  const [typeOfDelivery, setTypeOfDelivery] = useState('');
  const [typeOfPayment, setTypeOfPayment] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [statusOrderingModal, setStatusOrderingModal] = useState(false);

  const ordersRef = collection(firestoreDb, 'orders');

  const totalOrderSum = typeOfDelivery === 'deliveryAroundCity' ? (+orderSum + 50) : orderSum;

  const onShowStatusOrderingModal = () => {
    if (statusOrderingModal === false) {
      setStatusOrderingModal(true);

      setTimeout(() => {
        setShowSpinner(false);
        setCustomerName('');
        setCustomerPhoneNumber('');
        setCustomerAddress('');
        setCustomerCommet('');
        setTypeOfDelivery('');
        setTypeOfPayment('');
        
        localStorage.removeItem('foodData');
        localStorage.removeItem('totalFoodPosition');
        onChangeFoodListInShopBag([]);
        onChangeTotalOrderAmount(0);
        onActiveShopBag(null, 'ordered-food');
      }, 9800);

      setTimeout(() => {
        setStatusOrderingModal(false);
      }, 10100);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Work for authorization user 
    if (Boolean(auth.currentUser) === true) {
      setShowSpinner(true);
      try {
        await addDoc(ordersRef, {
          foodItemList: JSON.stringify(foodListInShopBag),
          createdAt: serverTimestamp(),
          email: auth.currentUser.email,
          name: customerName,
          phoneNumber: customerPhoneNumber,
          address: customerAddress,
          comment: customerComment,
          typeOfDelivery,
          typeOfPayment,
          totalOrderSum,
        });

        onShowStatusOrderingModal();
      } catch (err) {
        setShowSpinner(false);
        console.log(err.messaage, err);
      }
      // For unauthorized user
    } else {
      onShowStatusOrderingModal();
    }
  };

  const contentShopBagFoodList = foodListInShopBag !== null ? foodListInShopBag.map(({ img, name, price, size, weight, counter, id }) => {
    return (
      <CSSTransition key={id} timeout={300} classNames="food-list">
        <div className="order-list__product-item">
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

  const rndm = Math.floor(Math.random() * (1000 - (-1000)) + (-1000));
  const additionalHeight = +totalOrderAmount * 70;

  return (
    <div className={`order-list ${activeStyleShopBag}`}>
      <div 
        className={`order-list_overlay${statusOrderingModal ? ' order-list_hiddenScroll' : ''}`}
        onClick={onActiveShopBag} 
      >
        <div className={`order-list__close ${statusOrderingModal ? 'order-list_hidden' : ''}`}>
          <button className="order-list__close-btn">
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`order-list__popup ${statusOrderingModal ? 'order-list_hidden' : ''}`}>
          <div className="order-list__title">Ваше замовлення:</div>
          <div className="order-list__products">
            <TransitionGroup component="div">
              {contentShopBagFoodList}
            </TransitionGroup>
          </div>

          <div className="order-list__total-amount">Сума: {orderSum} грн</div>
          
          <div className="order-list__form order-form">
            <form onSubmit={handleSubmit}>
              <div className="order-form__enterInfo">
                <label className="order-form__usualLabel" htmlFor="name">Як до Вас звертатися:</label>
                <input
                  className="order-form__usualInput"
                  id="name"
                  name="customer name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required />
              </div>

              <div className="order-form__enterInfo">
                <label className="order-form__usualLabel" htmlFor="phone-number">Номер телефону:</label>
                <input
                  className="order-form__usualInput"
                  id="phone-number"
                  name="customer phone number"
                  type="tel"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  required />
              </div>

              <div className="order-form__enterInfo">
                <div className="order-form__subtitle">Варіанти доставки:</div>
                <p className="order-form__radio">
                  <input
                    type="radio"
                    name="typeOfDelivery"
                    id="deliveryAroundCity"
                    value={typeOfDelivery}
                    onChange={() => setTypeOfDelivery('deliveryAroundCity')}
                  />
                  <label htmlFor="deliveryAroundCity">Доставка по місту до 8 км 50 гривень</label>
                </p>
                <p className="order-form__radio">
                  <input
                    type="radio"
                    name="typeOfDelivery"
                    id="pickup"
                    value={typeOfDelivery}
                    onChange={() => setTypeOfDelivery('pickup')}
                  />
                  <label htmlFor="pickup">Самовивіз за адресою вул. Пашутинська 61/84</label>
                </p>
              </div>

              <div className="order-form__enterInfo">
                <label className="order-form__usualLabel" htmlFor="address">Адреса</label>
                <input
                  className="order-form__usualInput"
                  id="address"
                  name="delivery address"
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required />
              </div>

              <div className="order-form__enterInfo">
                <label className="order-form__usualLabel" htmlFor="comment">Коментар</label>
                <input
                  className="order-form__usualInput"
                  id="comment"
                  name="customer comment"
                  type="text"
                  value={customerComment}
                  onChange={(e) => setCustomerCommet(e.target.value)}
                />
              </div>

              <div className="order-form__enterInfo">
                <div className="order-form__subtitle">Спосіб оплати:</div>
                <p className="order-form__radio">
                  <input
                    type="radio"
                    name="typeOfPayment"
                    id="cash"
                    value={typeOfPayment}
                    onChange={() => setTypeOfPayment('cash')}
                  />
                  <label htmlFor="cash">Готівкою при отриманні</label>
                </p>
                <p className="order-form__radio">
                  <input
                    type="radio"
                    name="typeOfPayment"
                    id="online"
                    value={typeOfPayment}
                    onChange={() => setTypeOfPayment('online')}
                  />
                  <label htmlFor="online">Онлайн карткою Visa або Mastercard</label>
                </p>
              </div>

              <div className="order-form__orderAmount">
                <div className="order-form__amount">Сума: {orderSum} грн</div>
                {
                  typeOfDelivery === 'deliveryAroundCity' ?
                    <div className="order-form__deliveryAmount">Доставка по місту до 8 км 50 гривень: 50грн</div> :
                    null
                }
                <div className="order-form__totalAmount">Загальна сума: {totalOrderSum} грн</div>
              </div>

              <button className="order-form__orderBtn">
                {showSpinner ? <Spinner size={16} wrapperSize={100} /> : 'Замовити'}
              </button>
            </form>
          </div>
        </div>

        <div 
          className={`success-ordered ${statusOrderingModal ? 'success-ordered_active' : ''}`}
          style={{top: `calc(100% + ${additionalHeight}px)`}}
        >
          <h2 className="success-ordered__title">Ваше замовлення прийнято!</h2>
          <div className="success-ordered__number">
            Номер вашого замовлення <strong>№{rndm}</strong>
          </div>
          <div className="success-ordered__other-info">
            <p>Невдовзі вам зателефонує наш оператор.</p>
            <p>Дякуємо за ваш вибір!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingBag;