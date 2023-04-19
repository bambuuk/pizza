import { NavLink } from 'react-router-dom';
import payment_system from '../../resources/img/payment_systems.png';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer content__footer" role="contentinfo">
      <nav className="footer__navigation">
        <div className="footer__payment-system">
          <div className="footer__img-wrapper">
            <img src={payment_system} alt="Payment system" className="footer__img-ps" />
          </div>
          <div className="footer__made">Made by Ivan Korobka</div>
        </div>
        <div className="footer__information">
          <div className="footer__title">Клієнтам:</div>
          <ul className="footer__links-list">
            <li className="footer__link-item">
              <NavLink to="/confidentiality" className="footer__link">Політика конфіденційності</NavLink>
            </li>
            <li className="footer__link-item">
              <NavLink to="/type-of-payment" className="footer__link">Способи оплати</NavLink>
            </li>
            <li className="footer__link-item">
              <NavLink to="/public-offer" className="footer__link">Публічна оферта</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer__information">
          <div className="footer__title">Інформація:</div>
          <ul className="footer__links-list">
            <li className="footer__link-item">
              <NavLink to="*" className="footer__link">Акції</NavLink>
            </li>
            <li className="footer__link-item">
              <NavLink to="*" className="footer__link">Новини</NavLink>
            </li>
            <li className="footer__link-item">
              <NavLink to="/delivery" className="footer__link">Доставка і оплата</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer__information">
          <div className="footer__title">Контакти:</div>
          <ul className="footer__links-list">
            <li className="footer__link-item">
              <a href="tel:+380999999999" className="footer__link">
                (099) 999-99-99 <strong>Vodafone</strong>
              </a>
            </li>
            <li className="footer__link-item">
              <a
                href={`https://www.google.com/maps/search/%D0%B3%D1%80%D0%B8%D0%BB%D0%BB%D0%B0/@
                50.4367035,29.3661665,7z/data=!3m1!4b1`}
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                м.Кропивницький
              </a>
            </li>
            <li className="footer__link-item">
              <a
                href={`https://www.google.com/maps/search/%D0%B3%D1%80%D0%B8%D0%BB%D0%BB%D0%B0/@
                50.4367035,29.3661665,7z/data=!3m1!4b1`}
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                вул. Пашутинська 61/84
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  )
}

export default Footer;