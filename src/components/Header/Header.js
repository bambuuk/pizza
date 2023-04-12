import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import Auth from "../Auth/Auth";
import logo from '../../resources/img/logo.png';
import './header.scss';

const Header = ({ fixedHeader }) => {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
  const [activeLogRegWindow, setActiveLogRegWindow] = useState(false);

  const toggleActive = (e, activeObject) => {
    if ((e.type === 'click' || e.code === 'Enter') && activeObject === 'burger-menu') {
      setActiveBurgerMenu(value => !value);
      document.body.classList.toggle('no-scroll');
    }
    if ((e.type === 'click' || e.code === 'Enter') && activeObject === 'log-reg-window') {
      setActiveLogRegWindow(value => !value);
      document.body.classList.toggle('no-scroll');
    }
  };

  const styleBurger = activeBurgerMenu ? 'header__burger_active' : '';
  const styleMenu = activeBurgerMenu ? 'burger__menu_active' : '';
  const headerClazz = fixedHeader ? 'header header_fixed' : 'header';

  return (
    <div className="header-wrapper">
      <header className={headerClazz}>
        <div className="header__logo logo">
          <Link to="/" reloadDocument className="logo__link">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <nav className={`header__menu ${styleMenu}`}>
          <ul className="header__list">
            <li>
              <NavLink to="/about-us" className="header__link">Про нас</NavLink>
            </li>
            <li>
              <NavLink to="/delivery" className="header__link">Доставка</NavLink>
            </li>
            <li>
              <NavLink to="/type-of-payment" className="header__link">Типи оплати</NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__shoppin-bag"></div>

        <div className="header__social-networks social-networks">
          <a
            href="https://www.facebook.com/grilla.kr.ua/"
            className="social-networks__link"
            target="_blank"
            rel="noreferrer"
          >
            <div className="social-networks__round">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005 C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21 c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996 C17.465,9.521,17.001,9,16.403,9z" />\
              </svg>
            </div>
          </a>
          <a
            href="https://www.instagram.com/grilla.house/"
            className="social-networks__link"
            target="_blank"
            rel="noreferrer"
          >
            <div className="social-networks__round">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
                <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
              </svg>
            </div>
          </a>
        </div>

        <div 
          className="header__logreg"
          onClick={(e) => toggleActive(e, 'log-reg-window')}
          onKeyDown={(e) => toggleActive(e, 'log-reg-window')}
        >
          <span>Увійти</span>
        </div>

        <Link to="/contacts" className="header__contacts">
          <span>Контакти</span>
        </Link>

        <div
          className={`header__burger ${styleBurger}`}
          onClick={(e) => toggleActive(e, 'burger-menu')}
          onKeyDown={(e) => toggleActive(e, 'burger-menu')}
          role="button"
        >
          <div className="header__burger_wrapper">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className={`burger burger__menu ${styleMenu}`}>
          <ul className="burger__list">
            <li>
              <NavLink to="/" className="burger__link">Головна</NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="burger__link">Про нас</NavLink>
            </li>
            <li>
              <NavLink to="/delivery" className="burger__link">Доставка</NavLink>
            </li>
            <li>
              <NavLink to="/type-of-payment" className="burger__link">Типи оплати</NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className="burger__link">Контакти</NavLink>
            </li>
            <li>
              <span className="burger__logreg">Увійти</span>
            </li>
          </ul>
        </nav>
      </header>
      <Auth activeLogRegWindow={activeLogRegWindow} toggleActive={toggleActive} />
    </div>
  )
}

export default Header;