import { useState } from 'react';
import {
  auth,
  googleProvider,
  facebookProvider,
  firestoreDb
} from '../../firebase';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  addDoc, collection
} from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Spinner from '../Spinner/Spinner';
import './auth.scss';

const cookies = new Cookies();

const Auth = (props) => {
  const { activeLogRegWindow, toggleLogRegWindActive, setIsAuth } = props;
  const [activeRegPage, setActiveRegPage] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [successWindow, setSuccessWindow] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const ordersRef = collection(firestoreDb, 'orders');

  const loginFormik = useFormik({
    initialValues: {
      loginEmail: '',
      loginPassword: '',
    },
    validationSchema: Yup.object({
      loginEmail: Yup.string()
        .email('Неправильна email адреса')
        .required("Обов'язкове поле"),
      loginPassword: Yup.string()
        .min(6, 'Не менше 6 символів')
        .required("Обов'язкове поле"),
    }),
    onSubmit: async ({ loginEmail, loginPassword }) => {
      setShowSpinner('login');
      try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        localStorage.setItem('auth-token-pizza', user.user.refreshToken);

        if (successWindow === false) {
          setSuccessWindow(true);

          setTimeout(() => {
            setIsAuth(true);
            toggleLogRegWindActive(null, 'login');
            setSuccessWindow(false);
          }, 3000);
        }
        console.log('login');
      } catch (error) {
        setShowSpinner(false);
        setLoginError(error.message);
        console.log(error.message);
      }
    }
  });

  const registerFormik = useFormik({
    initialValues: {
      userName: '',
      registerEmail: '',
      registerPassword: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(2, 'Мінімум 2 символа')
        .required("Обов'язкове поле"),
      registerEmail: Yup.string()
        .email('Неправильна email адреса')
        .required("Обов'язкове поле"),
      registerPassword: Yup.string()
        .min(6, 'Не менше 6 символів')
        .required("Обов'язкове поле"),
    }),
    onSubmit: async ({ userName, registerEmail, registerPassword }) => {
      setShowSpinner('register');
      try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        localStorage.setItem('auth-token-pizza', user.user.refreshToken);

        const userNamesCookiList = cookies.get('userNamesList') ? cookies.get('userNamesList') : '';

        const newUserNamesCookiList = Array.isArray(userNamesCookiList) ?
          JSON.stringify([...userNamesCookiList, { email: user.user.email, name: userName }]) :
          JSON.stringify([{ email: user.user.email, name: userName }]);

        cookies.set('userNamesList', newUserNamesCookiList);

        // sending first empty info to the firestore on the user for orders history function 
        // in the UserCabinet component
        await addDoc(ordersRef, {
          email: user.user.email,
          status: 'empty'
        });

        if (successWindow === false) {
          setSuccessWindow(true);

          setTimeout(() => {
            setIsAuth(true);
            toggleLogRegWindActive(null, 'login');
            setSuccessWindow(false);
            setLoginError('');
            setRegisterError('');
          }, 3000);
        }
        console.log('login');
      } catch (error) {
        setShowSpinner(false);
        setRegisterError(error.message);
        console.log(error.message);
      }
    }
  });

  const signInWithOtherSyst = async (typeSystemAuth) => {
    setShowSpinner(`${typeSystemAuth}`);
    try {
      if (typeSystemAuth === 'google') {
        const result = await signInWithPopup(auth, googleProvider);
        localStorage.setItem('auth-token-pizza', result.user.refreshToken);

        await addDoc(ordersRef, {
          email: result.user.email,
          status: 'empty'
        });
      } else if (typeSystemAuth === 'facebook') {
        const result = await signInWithPopup(auth, facebookProvider);
        localStorage.setItem('auth-token-pizza', result.user.refreshToken);

        await addDoc(ordersRef, {
          email: result.user.email,
          status: 'empty'
        });
      }

      if (successWindow === false) {
        setSuccessWindow(true);

        setTimeout(() => {
          setIsAuth(true);
          toggleLogRegWindActive(null, 'login');
          setSuccessWindow(false);
        }, 3000);
      }
      console.log('login');
    } catch (err) {
      setShowSpinner(false);
      console.error(err.message);
    }
  }

  const showRegWindow = activeRegPage ? 'show' : '';
  const hideLogWindow = activeRegPage ? 'hide' : '';
  const authPopupClazz = activeLogRegWindow ? 'active-popup' : '';
  const loginErrorClazz = loginError ? 'result-err result-err_show' : 'result-err';
  const regErrorClazz = registerError.includes('email-already-in-use') ?
    'result-err result-err_show' : 'result-err';

  return (
    <div className={`auth auth_overlay ${authPopupClazz}`} onClick={successWindow ? null : (e) => toggleLogRegWindActive(e)}>
      <div className={`form__success${successWindow ? " form__success_active" : ''}`}>
        Ви успішно авторизувалися!
      </div>
      <div className={`auth__wrapper${successWindow ? ' auth__wrapper_hide' : ''}`}>
        <span
          className="icon-close"
        >
          <i className='bx bx-x'></i>
        </span>
        <div className="logreg-box">

          {/* Login form */}
          <div className={`form-box login ${hideLogWindow}`}>
            <div className="logreg-title">
              <h2 className="">Логін</h2>
            </div>

            <div className={loginErrorClazz}>
              Неправильне ім'я користувача або пароль. Сробуйте ще раз.
            </div>

            <form onSubmit={loginFormik.handleSubmit}>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input
                  name="loginEmail"
                  type="email"
                  autoComplete="email"
                  value={loginFormik.values.loginEmail}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                />
                <label>Пошта</label>
                {loginFormik.errors.loginEmail && loginFormik.touched.loginEmail ? <div className="error-message">{loginFormik.errors.loginEmail}</div> : null}
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt' ></i></span>
                <input
                  name="loginPassword"
                  type="password"
                  autoComplete="password"
                  value={loginFormik.values.loginPassword}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                />
                <label>Пароль</label>
                {loginFormik.errors.loginPassword && loginFormik.touched.loginPassword ? <div className="error-message">{loginFormik.errors.loginPassword}</div> : null}
              </div>

              <button
                type="submit"
                className="btn"
                disabled={showSpinner ? true : false}
              >
                {showSpinner === 'login' ? <Spinner size={16} wrapperSize={100} /> : 'Увійти'}
              </button>

              <div className="logreg-link">
                <p>
                  Немає облікового запису?
                  <button
                    className="register-link"
                    onClick={() => setActiveRegPage(value => !value)}
                  >&nbsp; Зареєструватись</button>
                </p>
              </div>
            </form>
          </div>

          {/* Register form */}
          <div className={`form-box register ${showRegWindow}`}>
            <div className="logreg-title">
              <h2>Реєстрація</h2>
            </div>
            <div className={regErrorClazz}>
              Дана email адреса вже використовується.
            </div>

            <form onSubmit={registerFormik.handleSubmit}>
              <div className="input-box">
                <span className="icon"><i className='bx bxs-user' ></i></span>
                <input
                  name="userName"
                  type="text"
                  value={registerFormik.values.userName}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                <label>Ім'я</label>
                {registerFormik.errors.userName && registerFormik.touched.userName ? <div className="error-message">{registerFormik.errors.userName}</div> : null}
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input
                  name="registerEmail"
                  type="email"
                  value={registerFormik.values.registerEmail}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                <label>Пошта</label>
                {registerFormik.errors.registerEmail && registerFormik.touched.registerEmail ? <div className="error-message">{registerFormik.errors.registerEmail}</div> : null}
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt' ></i></span>
                <input
                  name="registerPassword"
                  type="password"
                  autoComplete="password"
                  value={registerFormik.values.registerPassword}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                <label>Пароль</label>
                {registerFormik.errors.registerPassword && registerFormik.touched.registerPassword ? <div className="error-message">{registerFormik.errors.registerPassword}</div> : null}
              </div>

              <button
                type="submit"
                className="btn"
                disabled={showSpinner ? true : false}
              >
                {showSpinner === 'register' ? <Spinner size={16} wrapperSize={100} /> : 'Реєстрація'}
              </button>

              <div className="logreg-link">
                <p>
                  Вже маєте акаунт?
                  <button
                    className="login-link"
                    onClick={() => setActiveRegPage(value => !value)}
                    onKeyDown={() => setActiveRegPage(value => !value)}
                  >&nbsp; Логін</button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="media-options">
          <button onClick={(e) => signInWithOtherSyst('google')} disabled={showSpinner ? true : false}>
            {
              showSpinner === 'google' ?
                <Spinner size={16} wrapperSize={100} /> :
                (
                  <>
                    <i className='bx bxl-google' ></i>
                    <span>Увійти за допомогою Google</span>
                  </>
                )
            }
          </button>
          <button onClick={(e) => signInWithOtherSyst('facebook')} disabled={showSpinner ? true : false}>
            {
              showSpinner === 'facebook' ?
                <Spinner size={16} wrapperSize={100} /> :
                (
                  <>
                    <i className='bx bxl-facebook-circle' ></i>
                    <span>Увійти за допомогою Facebook</span>
                  </>
                )
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth;