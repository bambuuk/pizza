import { useState } from 'react';
import './auth.scss';

const Auth = (props) => {
  const { activeLogRegWindow, toggleActive } = props;
  const authPopupClazz = activeLogRegWindow ? 'active-popup' : '';
  const [activeRegPage, setActiveRegPage] = useState(false);

  const showRegWindow = activeRegPage ? 'show' : '';
  const hideLogWindow = activeRegPage ? 'hide' : '';
  return (
    <div className={`auth auth_overlay ${authPopupClazz}`}>
      <div className="auth__wrapper">
        <span 
          className="icon-close"
          onClick={(e) => toggleActive(e, 'log-reg-window')}
          onKeyDown={(e) => toggleActive(e, 'log-reg-window')}
        >
          <i className='bx bx-x'></i>
        </span>
        <div className="logreg-box">

          {/* Login form */}
          <div className={`form-box login ${hideLogWindow}`}>
            <div className="logreg-title">
              <h2 className="">Login</h2>
            </div>

            <form action="">
              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input type="email" required />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt' ></i></span>
                <input id="password" type="password" required />
                <label htmlFor="password">Password</label>
              </div>

              <button type="submit" className="btn">Login</button>

              <div className="logreg-link">
                <p>
                  Don't have an account?
                  <a 
                    href="#" 
                    className="register-link"
                    onClick={() => setActiveRegPage(value => !value)}
                    onKeyDown={() => setActiveRegPage(value => !value)}
                  > Register</a>
                </p>
              </div>
            </form>
          </div>

          {/* Register form */}
          <div className={`form-box register ${showRegWindow}`}>
            <div className="logreg-title">
              <h2 className="">Registration</h2>
            </div>

            <form action="">
              <div className="input-box">
                <span className="icon"><i className='bx bxs-user' ></i></span>
                <input type="text" required />
                <label>Full Name</label>
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-envelope'></i></span>
                <input type="email" required />
                <label>Email</label>
              </div>

              <div className="input-box">
                <span className="icon"><i className='bx bxs-lock-alt' ></i></span>
                <input id="password" type="password" required />
                <label htmlFor="password">Password</label>
              </div>

              <button type="submit" className="btn">Register</button>

              <div className="logreg-link">
                <p>
                  Already have an account?
                  <a 
                    href="#" 
                    className="login-link"
                    onClick={() => setActiveRegPage(value => !value)}
                    onKeyDown={() => setActiveRegPage(value => !value)}
                  > Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="media-options">
          <a href="">
            <i className='bx bxl-google' ></i>
            <span>Login with Google</span>
          </a>
          <a href="">
            <i className='bx bxl-facebook-circle' ></i>
            <span>Login with Facebook</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Auth;