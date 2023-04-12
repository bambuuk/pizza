import 'auth.scss';

const Auth = () => {
  return (
    <section class="section">
      <div class="wrapper">
        <span class="icon-close">
          <i class='bx bx-x' ></i>
        </span>
        <div class="logreg-box">

          {/* Login form */}
          <div class="form-box login">
            <div class="logreg-title">
              <h2 class="">Login</h2>
              <p>Please login to use the platform</p>
            </div>

            <form action="">
              <div class="input-box">
                <span class="icon"><i class='bx bxs-envelope'></i></span>
                <input type="email" required />
                <label>Email</label>
              </div>

              <div class="input-box">
                <span class="icon"><i class='bx bxs-lock-alt' ></i></span>
                <input id="password" type="password" required />
                <label for="password">Password</label>
              </div>

              <div class="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" class="btn">Login</button>

              <div class="logreg-link">
                <p>
                  Don't have an account?
                  <a href="#" class="register-link">Register</a>
                </p>
              </div>
            </form>
          </div>

          {/* Register form */}
          <div class="form-box register">
            <div class="logreg-title">
              <h2 class="">Registration</h2>
              <p>Please provide the following to varify your identity</p>
            </div>

            <form action="">
              <div class="input-box">
                <span class="icon"><i class='bx bxs-user' ></i></span>
                <input type="text" required />
                <label>Full Name</label>
              </div>

              <div class="input-box">
                <span class="icon"><i class='bx bxs-envelope'></i></span>
                <input type="email" required />
                <label>Email</label>
              </div>

              <div class="input-box">
                <span class="icon"><i class='bx bxs-lock-alt' ></i></span>
                <input id="password" type="password" required />
                <label for="password">Password</label>
              </div>

              <div class="remember-forgot">
                <label><input type="checkbox" />
                  I agree to the terms & conditions
                </label>
              </div>

              <button type="submit" class="btn">Registar</button>

              <div class="logreg-link">
                <p>
                  Already have an account?
                  <a href="#" class="login-link">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div class="media-options">
          <a href="">
            <i class='bx bxl-google' ></i>
            <span>Login with Google</span>
          </a>
          <a href="">
            <i class='bx bxl-facebook-circle' ></i>
            <span>Login with Facebook</span>
          </a>
        </div>
      </div>
    </section>
  )
}