import './foodItem.scss';

const FoodItem = (props) => {
  const {img, name, price, shortDescr} = props.data;

  return (
    <div className="food-item">
      <div className="food-item__img">
        <img src={img} alt={name} />
      </div>
      <div className="food-item__body">
        <div className="food-item__features">
          <div className="food-item__title">{name}</div>
          <div className="food-item__descr">{shortDescr}</div>
          <div className="food-item__price">{`${price} грн`}</div>
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