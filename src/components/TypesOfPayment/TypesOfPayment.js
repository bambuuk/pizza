import './typesOfPayment.scss';

const TypesOfPayment = () => {
  return (
    <div className="pay content_pay">
      <h2 className="pay__title">Варіанти оплати</h2>

      <h3 className="pay__subtitle">Онлайн оплата</h3>
      <p className="pay__description">
        Для вибору оплати товару за допомогою банківської карти при виборі<br />
        способу оплати необхідно натиснути кнопку «<strong>Оплатити онлайн</strong>».<br />
        Оплата відбувається банківськими картами через систему онлайн платежів <strong>LiqPay</strong>.
      </p>

      <h3 className="pay__subtitle">Готівкою при отриманні</h3>
      <p className="pay__description">
        Якщо товар доставляється кур'єром, то оплата здійснюється готівкою кур'єру в руки.<br />
        При отриманні товару обов'язково перевірте ваше замовлення.
      </p>

      <h3 className="pay__subtitle">Попередня оплата на картку ПриватБанк</h3>
      <p className="pay__description">
        Якщо Вам зручно оплатити замовлення зробивши переказ на картку — можете зробити<br />
        це після підтвердження Вашого замовлення та доставлення.
      </p>

      <p className="pay__card-info">
        Наша картка - 9999999999999999 - Ророноа Зоро
      </p>
    </div>
  );
} 

export default TypesOfPayment;