import bigLogo from '../../resources/img/bigLogo.png';
import './infoAboutUs.scss';

const InfoAboutUs = () => {
  return (
    <div className="about-us">
      <div className="about_us__text-body">
        <h1 className="about-us__title">Про нас</h1>
        <div className="about-us__project-name">Grilla FastFood</div>
        <p className="about-us__main-description">
          <strong>«Grilla» «Грілла»</strong> – це заклад, який не так давно відкрився у Кропивницькому,
          однак уже встиг врятувати від знесилення і голодної смерті багатьох жителів
          та гостей міста. Його концепція – приготування та доставка їжі й напоїв, які
          неможливо забути – настільки вони смачні.
        </p>
        <p className="about-us__name-list">Отож, що таке «<strong>Grilla</strong>»? Це:</p>
        <ul className="about-us__info-list" type="disc">
          <li className="about-us__item">доставка піци – фірмової «Grilla», «Аквамен», «Рокфор» (4 сири),
            «М'ясне сафарі» (4 м'яса), «Гавайська хвиля», «Джокер», «Хедшот», «Маргарита», «Hammer»;
          </li>
          <li className="about-us__item">доставка бургерів різних розмірів – зі свининою, курятиною,
            яловичиною тощо;
          </li>
          <li className="about-us__item">доставка картоплі фрі;</li>
          <li className="about-us__item">доставка курячих крилець – в гострому, гірчичному,
            медовому або соусі BBQ;
          </li>
          <li className="about-us__item">доставка напоїв – соків, газованої і негазованої води.</li>
        </ul>
        <p className="about-us__description">
          В «Grilla» чудово розуміють, що улюбленої їжі повинно бути якомога більше, а замовляти
          її повинно бути максимально вигідно, тому підготували для вас спеціальне комбо-меню.
          Там ви знайдете щось і для посиденьок в колі родини, і для компанії друзів, і,
          звісно, для проведення гарного вечора наодинці.
        </p>
        <br />
        <p className="about-us__motto">
          «Grilla» – найкраща доставка в Кропивницькому! Голодний, як горила? Замовляй «Grilla»!
        </p>
      </div>
      <div className="about_us__big-logo">
        <div className="about-us__img-wrapper">
          <img src={bigLogo} alt="Our logotype" />
        </div>
      </div>
    </div>
  )
}

export default InfoAboutUs;