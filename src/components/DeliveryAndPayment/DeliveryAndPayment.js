import './deliveryAndPayment.scss';

const DeliveryAndPayment = () => {
  return (
    <div className="delivery content__delivery">
      <h2 className="delivery__subtitle">Доставка їжі і оплата</h2>
      <div className="delivery__noties">
        <p>Доставка по Кропивницькому<br />
          <strong>+38 (066) 222 00 13</strong><br />
          <br />
          <strong>Години роботи Доставки</strong>: з 11:00 до 21:30<br />
          <strong>Години роботи закладу</strong>: з 11:00 до 22:00<br />
          <strong>Середній час доставки</strong>&nbsp;- 1 година<br />
          <br />
          <strong>Адреса</strong>:
          <a
            href={`https://www.google.com/maps/search/%D0%B3%D1%80%D0%B8%D0%BB%D0%BB%D0%B0/@
            50.4367035,29.3661665,7z/data=!3m1!4b1`}
            className="delivery__link"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;м.Кропивницький, вул. Пашутинська 61/84
          </a><br />
          <br />

          У разі ускладнення руху містом, погодних умов, чи сирен - час доставлення може складати більше 1 години.<br />
          <br />
          <strong>Ціна доставки по місту</strong>&nbsp;- згідно з цінами перевізника &quot;Містер АМ&quot;. Залежить від відстані.<br />
          <span className="delivery__terrifs">Тарифи: можна дізнатися у адміністратора.</span>
          <br />
          <br />
          <strong>Оплата</strong>:<br />
          Оплата на сайті<br />
          Кур&#39;єру готівкою<br />
          Переказ на картку ПриватБанку<br />
          <br />
          <strong>Перевірте, будь ласка, адресу доставки, перш ніж замовляти.</strong></p>
      </div>
    </div>
  )
}

export default DeliveryAndPayment;