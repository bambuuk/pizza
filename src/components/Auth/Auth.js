import './auth.scss';

const Auth = () => {
  return (
    <div className="auth auth_overlay">
      <div className="auth__wrapper">
        <span className="icon-close">
          <i className='bx bx-x'></i>
        </span>
        <div className="logreg-box">

          {/* Login form */}
          <div className="form-box login">
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

              <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="btn">Login</button>

              <div className="logreg-link">
                <p>
                  Don't have an account?
                  <a href="#" className="register-link">Register</a>
                </p>
              </div>
            </form>
          </div>

          {/* Register form */}
          <div className="form-box register">
            <div className="logreg-title">
              <h2 className="">Registration</h2>
              <p>Please provide the following to varify your identity</p>
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

              <div className="remember-forgot">
                <label><input type="checkbox" />
                  I agree to the terms & conditions
                </label>
              </div>

              <button type="submit" className="btn">Registar</button>

              <div className="logreg-link">
                <p>
                  Already have an account?
                  <a href="#" className="login-link">Login</a>
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