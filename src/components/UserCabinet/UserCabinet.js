import { useState, useEffect, useMemo } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, query, where, orderBy, collection } from "firebase/firestore";
import { auth, firestoreDb } from '../../firebase';
import Cookies from 'universal-cookie';

import './userCabinet.scss';

const cookies = new Cookies();

const UserCabinet = (props) => {
  const { activeLogRegWindow, toggleLogRegWindActive, setIsAuth } = props;
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserName, setCurrentUserName] = useState('');
  const [listOrders, setListOrders] = useState([]);
  const [successWindow, setSuccessWindow] = useState(false);

  const ordersRef = collection(firestoreDb, 'orders');

  // getting info about auth user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  // adding correct user name to the state
  useEffect(() => {
    if (currentUser) {
      if (currentUser.displayName) {
        setCurrentUserName(currentUser.displayName);
      } else if (Array.isArray(cookies.get('userNamesList'))) {
        const arrOfUserNames = cookies.get('userNamesList');
        arrOfUserNames.forEach(item => {
          if (item.email === currentUser.email) {
            setCurrentUserName(item.name);
          }
        })
      }
    }
  }, [currentUser]);

  // logout function
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('auth-token-pizza');

      if (successWindow === false) {
        setSuccessWindow(true);

        setTimeout(() => {
          setIsAuth(false);
          toggleLogRegWindActive(null, 'logout');
          setSuccessWindow(false);
        }, 3000);
      }
      console.log('logout')
    } catch (err) {
      console.log(err.messaage, 'error');
    }
  }

  // getting info about ordered history
  useEffect(() => {
    if (currentUser) {
      if (Boolean(currentUser.email) === true) {
        // gets all messages with room name from props
        const queryOrders = query(
          ordersRef,
          where("email", "==", currentUser.email),
          orderBy('createdAt') // need to connect with using method query and add index in firestore 
        );

        // listening all changes for queryOrders
        const unsuscribe = onSnapshot(queryOrders, (snapshot) => {
          let newOrders = [];
          snapshot.forEach((doc) => {
            newOrders.push({ ...doc.data(), id: doc.id });
          });
          setListOrders(newOrders);
        });

        return () => unsuscribe();
      }
    }
    // eslint-disable-next-line
  }, [currentUser]);

  // Food ordered history value
  const contentFoodList = useMemo(() => {
    return listOrders ? listOrders.map(({ address, totalOrderSum, createdAt, foodItemList, id }) => {
      let date = '';
      let month = '';
      let year = '';
      if (createdAt) {
        date = new Date(createdAt.seconds * 1000).getDate();
        month = new Date(createdAt.seconds * 1000).getMonth();
        year = new Date(createdAt.seconds * 1000).getFullYear();
        date = date.length > 1 ? date : `0${date}`;
        month = month.length > 1 ? month : `0${month}`;
      }

      const contentItemList = JSON.parse(foodItemList).map(({ id, img, name, price, counter }) => {
        return (
          <div className="orders-list__food-item" key={id}>
            <div className="orders-list__food-img">
              <img src={img} alt={name} />
            </div>
            <div className="orders-list__food-name">{name}</div>
            <div className="orders-list__food-number">
              <span>1x</span>
              <span>{counter}</span>
            </div>
            <div className="orders-list__sum">
              <div className="orders-list__for-one-item">{price} грн</div>
              <div className="orders-list__total-sum">{+price * +counter} грн</div>
            </div>
          </div>
        );
      });

      return (
        <div 
          className="orders-list__item" 
          key={id}
        >
          <div className="orders-list__details">
            <div className="orders-list__address">{address ? address : 'Пашутинська 61/84. Кропивницький'}</div>
            <div className="orders-list__date">
              {
                createdAt ?
                  `${date.length > 2 ? date.slice(1) : date}/${month}/${year}` :
                  ''
              }
            </div>
            <div className="orders-list__order-sum">{`${totalOrderSum} грн`}</div>
          </div>
          <div className="orders-list__food-list">
            {contentItemList}
          </div>
        </div>
      )
    }) : "Замовлення відсутні";
  }, [listOrders]);

  const showWindow = activeLogRegWindow ? 'user-cabinet_active' : '';

  return (
    <div className={`user-cabinet ${showWindow}`}>
      <div className="user-cabinet__overlay" onClick={toggleLogRegWindActive}>
        <div className={`form__success${successWindow ? ' form__success_active' : ''}`}>
          Ви вийшли з власного кабінету!
        </div>
        <div className={`user-cabinet__wrapper${successWindow ? ' user-cabinet__wrapper_hide' : ''}`}>
          <div className="user-cabinet__icon-close">
            <i className='bx bx-x'></i>
          </div>

          <div className="user-cabinet__title">Ваш кабінет</div>

          <div className="user-cabinet__body">
            <div className="user-cabinet__user-name">
              <span>Ваше ім'я</span>
              <span>{currentUserName ? currentUserName : 'unkown'}</span>
            </div>
            <div className="user-cabinet__email">
              <span>E-mail</span>
              <span>{currentUser.email ? currentUser.email : 'unkown'}</span>
            </div>
          </div>

          <button className='user-cabinet__logout' onClick={signUserOut}>Закінчити сесію</button>

          <div className="user-cabinet__orders-list orders-list">
            <div className="orders-list__subtitle">Історія замовлень:</div>
            {
              contentFoodList.length === 0 ?
                <p className="orders-list__empty">Відсутня інформація</p> :
                contentFoodList}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCabinet;