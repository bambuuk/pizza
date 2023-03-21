import './contacts.scss';

const Contacts = () => {
  return (
    <div className="contacts content__contacts">
      <div className="contacts__description">
        <div className="contacts__title">Залишились питання</div>
        <br />
        <br />
        <p>&laquo;<strong>Grilla</strong>&raquo; &ndash; найкраща доставка в Кропивницькому! Голодний, як горила? Замовляй &laquo;<strong>Grilla</strong>&raquo;!
        </p>
        <br />

        <p>
          <strong>Графік роботи:</strong><br />
          з 11:00 до 22:00 без вихідних<br />
          <a href="tel:+380999999999" className='contacts__ph-number'>
            (099) 999-99-99 <strong>Vodafone</strong>
          </a>
        </p>
        <br />

        <p><strong>Адреса:</strong><br />
          вулиця Пашутинська 61/84<br />
          Україна,&nbsp;м. Кропивницький
        </p>
      </div>
      <div className="contacts__form">
        <form action="" className="form">
          <input
            type="number"
            name="number"
            className="form__input"
            placeholder="+380(99)99-99-999"
            required
          />
          <input
            type="text"
            name="customer-name"
            className="form__input"
            placeholder="Як до Вас звертатися"
            required
          />
          <textarea
            name="your-question"
            placeholder="Ваше запитання"
            className="form__textarea"
            required
          />
          <button className="form__btn">
            Відправити повідомлення
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacts;