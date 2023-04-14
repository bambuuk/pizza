import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Cookies from 'universal-cookie';

import './userCabinet.scss';

const cookies = new Cookies();

const UserCabinet = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserName, setCurrentUserName] = useState('');
  const {activeLogRegWindow, toggleLogRegWindActive, setIsAuth} = props;
  console.log(currentUser)

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
        </div>
      </div>
    </div>
  )
}

export default UserCabinet;