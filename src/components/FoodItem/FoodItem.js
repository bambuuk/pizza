import './foodItem.scss';
import pizza from '../../resources/img/pizza/мясне-сафарі-4-мяса.png';

const FoodItem = () => {
  return (
    <div className="food-item">
      <div className="food-item__img">
        <img src={pizza} alt="" />
      </div>
      <div className="food-item__body">
        <div className="food-item__features">
          <div className="food-item__title">М'ясне Сафарі (4 м'ясна)</div>
          <div className="food-item__descr">
            Салямі, кабаносі, шинка тостова, балик, маринована цибуля, сир моцарела, помідори, червоний соус
          </div>
          <div className="food-item__price">210 грн</div>
        </div>
        <div className="food-item__btns">
          <div className="food-item__amount">
            <div className="food-item__dec">
              <span></span>
            </div>
            <input className="food-item__counter" name="counter" type="number" placeholder="1"/>
            <div className="food-item__inc">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="food-item__btn-order">Замовити</div>
        </div>
      </div>
    </div>
  )
}

export default FoodItem;