import { useState, useEffect } from 'react';
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
  const {activeLogRegWindow, toggleLogRegWindActive, setIsAuth} = props;
  
  const ordersRef = collection(firestoreDb, 'orders');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

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

  useEffect(() => {
    if (Boolean(currentUser.email) === true) {
      // gets all messages with room name from props
    const queryOrders = query(
      ordersRef,
      where("email", "==", currentUser.email),
      orderBy('createdAt') // need to connect with using method query and add index in firestore 
    );

    // listening all changes for queryMessages
    const unsuscribe = onSnapshot(queryOrders, (snapshot) => {
      let newOrders = [];
      snapshot.forEach((doc) => {
        newOrders.push({ ...doc.data(), id: doc.id });
      });
      setListOrders(newOrders);
    });

    return () => unsuscribe();
  }
  // eslint-disable-next-line
  }, [currentUser]);

  console.log(listOrders);

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
            <div className="orders-listitem">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCabinet;