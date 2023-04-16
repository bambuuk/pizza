import { useState, useEffect, useMemo } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, query, where, orderBy, collection } from "firebase/firestore";
import { auth, firestoreDb } from '../../firebase';
import Cookies from 'universal-cookie';

import './userCabinet.scss';

const cookies = new Cookies();

const UserCabinet = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserName, setCurrentUserName] = useState('');
  const [listOrders, setListOrders] = useState([]);
  const { activeLogRegWindow, toggleLogRegWindActive, setIsAuth } = props;

  const ordersRef = collection(firestoreDb, 'orders');

  // getting info about auth user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  // adding correct user name to the state
  useEffect(() => {
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
  }, [currentUser]);

  // logout function
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('auth-token-pizza');
      setIsAuth(false);
      toggleLogRegWindActive(null, 'logout');
      console.log('logout')
    } catch (err) {
      console.log(err, 'error');
    }
  }

  // getting info about ordered history
  useEffect(() => {
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
          // console.log(doc, 'doc')
          newOrders.push({ ...doc.data(), id: doc.id });
        });
        setListOrders(newOrders);
      });

      return () => unsuscribe();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  // console.log(orderedTime)

  const contentFoodList = useMemo(() => {
    console.log(listOrders, 'listOrders')
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
        <div className="orders-list__item" key={id}>
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

  console.log(contentFoodList)

  const showWindow = activeLogRegWindow ? 'user-cabinet_active' : '';

  return (
    <div className={`user-cabinet ${showWindow}`}>
      <div className="user-cabinet__overlay" onClick={toggleLogRegWindActive}>
        <div className="user-cabinet__wrapper">
          <div className="user-cabinet__icon-close">
            <i className='bx bx-x'></i>
          </div>

          <div className="user-cabinet__title">Ваш кабінет</div>

          <div className="user-cabinet__body">
            {
              currentUserName ? (
                <div className="user-cabinet__user-name">
                  <span>Ваше ім'я</span>
                  <span>{currentUserName}</span>
                </div>
              ) : 'Відсутня інформація'
            }
            {
              currentUserName ? (
                <div className="user-cabinet__email">
                  <span>E-mail</span>
                  <span>{currentUser.email}</span>
                </div>
              ) : 'Відсутня інформація'
            }

          </div>

          <button className='user-cabinet__logout' onClick={signUserOut}>Закінчити сесію</button>

          <div className="user-cabinet__orders-list orders-list">
            <div className="orders-list__subtitle">Історія замовлень:</div>
            {
              contentFoodList.length === 0 ?
                <p className="orders-list__empty">Відсутня інформація</p> :
                contentFoodList}
            {/* <div className="orders-list__item">
              <div className="orders-list__details">
                <div className="orders-list__address">вул. Велика Перспективна 19, кв. 1 м. Кропивницький</div>
                <div className="orders-list__date">13/01/2000</div>
                <div className="orders-list__order-sum">1000 грн</div>
              </div>
              <div className="orders-list__food-list">
                <div className="orders-list__food-item">
                  <div className="orders-list__food-img">
                    <img src={img} alt="" />
                  </div>
                  <div className="orders-list__food-name">Гавайська хвиля (4 м'яса)</div>
                  <div className="orders-list__food-number">
                    <span>1x</span>
                    <span>26</span>
                  </div>
                  <div className="orders-list__sum">
                    <div className="orders-list__for-one-item">180 грн</div>
                    <div className="orders-list__total-sum">3600 грн</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCabinet;