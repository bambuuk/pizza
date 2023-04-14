import { useState } from 'react';
import { 
  auth, 
  googleProvider, 
  facebookProvider, 
} from '../../firebase';
import { 
  signInWithPopup,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

import './auth.scss';

const Auth = (props) => {
  const { activeLogRegWindow, toggleLogRegWindActive, setIsAuth } = props;
  const [activeRegPage, setActiveRegPage] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userName, setUserName] = useState('');

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      localStorage.setItem('auth-token-pizza', user.user.refreshToken);

      setRegisterEmail('');
      setRegisterPassword('');
      setUserName('');
      setIsAuth(true);
      toggleLogRegWindActive(null, 'login');
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      localStorage.setItem('auth-token-pizza', user.user.refreshToken);

      setLoginEmail('');
      setLoginPassword('');
      setIsAuth(true);
      toggleLogRegWindActive(null, 'login');
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = async (typeSystemAuth) => {
    try {
      if (typeSystemAuth === 'google') {
        const result = await signInWithPopup(auth, googleProvider);
        localStorage.setItem('auth-token-pizza', result.user.refreshToken);
        console.log(result);
      } else if (typeSystemAuth === 'facebook') {
        const result = await signInWithPopup(auth, facebookProvider);
        localStorage.setItem('auth-token-pizza', result.user.refreshToken);
        console.log(result);
      }

      setIsAuth(true);
      toggleLogRegWindActive(null, 'login');
    } catch (err) {
      console.error(err);
    }
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
  }

  const showRegWindow = activeRegPage ? 'show' : '';
  const hideLogWindow = activeRegPage ? 'hide' : '';
  const authPopupClazz = activeLogRegWindow ? 'active-popup' : '';

  return (
    <div className={`auth auth_overlay ${authPopupClazz}`} onClick={toggleLogRegWindActive}>
      <div className="auth__wrapper">
        <span
          className="icon-close"
        >
          <i className='bx bx-x'></i>
        </span>
        <div className="logreg-box">

          {/* Login form */}
          <div className={`form-box login ${hideLogWindow}`}>
            <div className="logreg-title">
              <h2 className="">Login</h2>
            </div>

            <form onSubmit={onSubmitForm}>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input 
                  name='login-email'
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)} 
                  required 
                />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt' ></i></span>
                <input 
                  name="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  required 
                />
                <label>Password</label>
              </div>

              <button 
                type="button"
                onClick={login} 
                className="btn"
              >
                Login
              </button>

              <div className="logreg-link">
                <p>
                  Don't have an account?
                  <button
                    className="register-link"
                    onClick={() => setActiveRegPage(value => !value)}
                    onKeyDown={() => setActiveRegPage(value => !value)}
                  >&nbsp; Register</button>
                </p>
              </div>
            </form>
          </div>

          {/* Register form */}
          <div className={`form-box register ${showRegWindow}`}>
            <div className="logreg-title">
              <h2>Registration</h2>
            </div>

            <form onSubmit={onSubmitForm}>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-user' ></i></span>
                <input 
                  name="user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)} 
                  required 
                />
                <label>Full Name</label>
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input 
                  name="registration-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)} 
                  required 
                />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt' ></i></span>
                <input 
                  name="registration-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required 
                />
                <label>Password</label>
              </div>

              <button 
                type="button" 
                className="btn"
                onClick={register}
              >
                Register
              </button>

              <div className="logreg-link">
                <p>
                  Already have an account?
                  <button
                    className="login-link"
                    onClick={() => setActiveRegPage(value => !value)}
                    onKeyDown={() => setActiveRegPage(value => !value)}
                  >&nbsp; Login</button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="media-options">
          <button onClick={(e) => signInWithGoogle('google')}>
            <i className='bx bxl-google' ></i>
            <span>Login with Google</span>
          </button>
          <button onClick={(e) => signInWithGoogle('facebook')}>
            <i className='bx bxl-facebook-circle' ></i>
            <span>Login with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth;