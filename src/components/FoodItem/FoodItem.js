import { useState } from 'react';
import './foodItem.scss';

const FoodItem = (props) => {
  const { img, name, price, shortDescr, size, weight, id } = props.data;
  const { onChangeTotalOrderAmount } = props;
  const [counter, setCounter] = useState(1);

  const onOrderFood = () => {
    // localStorage.removeItem('foodData');
    const foodData = JSON.parse(localStorage.getItem('foodData'));
    let newArrProduct = null;
    let foodItemAmount = 0;

    if (foodData !== null && Array.isArray(foodData)) {
      let dublicate = false;
      for (let i = 0; i < foodData.length; i++) {
        if (foodData[i].id === id) {
          dublicate = true;
          break;
        }
      };
      newArrProduct = dublicate ? foodData.map(item => {
        if (item.id === id) {
          return { ...item, counter: String(+item.counter + +counter) }
        } else {
          return item;
        }
      }) : [...foodData, { ...props.data, counter }];

      newArrProduct.forEach(item => {
        foodItemAmount += +item.counter;
      })
    }

    localStorage.setItem('foodData', JSON.stringify(newArrProduct));
    localStorage.setItem('totalFoodPosition', JSON.stringify(foodItemAmount));
    onChangeTotalOrderAmount(foodItemAmount);

    setCounter('1');
  }
  // console.log(JSON.parse(localStorage.getItem('foodData')))
  // console.log(JSON.parse(localStorage.getItem('totalFoodPosition')));


  // Counter for dec and inc Signs in food-item__amount html block
  const onCounter = (sign) => {
    if (sign === 'inc') {
      setCounter(value => String(+value + 1));
    } else if (sign === 'dec' && counter > 0) {
      setCounter(value => value > 1 ? String(+value - 1) : value);
    }
  };

  /* This function checks if counter is not <= 0  */
  const onInputChange = () => {
    if (counter <= 0) {
      setCounter('1');
    } else if (counter.length > 1 & counter[0] === '0') {
      const arrCounter = counter.split('');
      let indexFirstValueWOZero = 0;
      for (let i = 0; i < arrCounter.length; i++) {
        if (arrCounter[i] !== '0') {
          indexFirstValueWOZero = i;
          break;
        }
      };
      let arrCounterWOFirstZeroValue = arrCounter.slice(indexFirstValueWOZero);
      setCounter(arrCounterWOFirstZeroValue.join(''));
    }
  };

  const shDescr = shortDescr ? <>{shortDescr} <br /> <br /></> : null;
  let showingSizeAndWeight = null;
  if (size && weight) {
    showingSizeAndWeight = <>
      Розмір: {size} <br />
      Вага: {weight}
    </>
  } else if (!!size === true && !!weight !== true) {
    showingSizeAndWeight = `Розмір: ${size}`;
  } else if (!!weight === true && !!size !== true) {
    showingSizeAndWeight = `Вага: ${weight}`;
  }

  return (
    <div className="food-item">
      <div className="food-item__img">
        <img src={img} alt={name} />
      </div>
      <div className="food-item__body">
        <div className="food-item__features">
          <div className="food-item__title">{name}</div>
          <div className="food-item__descr">
            {shDescr}
            {showingSizeAndWeight}
          </div>
          <div className="food-item__price">{`${price} грн`}</div>
        </div>
        <div className="food-item__btns">
          <div className="food-item__amount">
            <div className="food-item__dec" onClick={() => onCounter('dec')}>
              <span></span>
            </div>
            <input
              className="food-item__counter"
              name="counter"
              type="number"
              value={counter}
              onChange={e => setCounter(e.target.value)}
              onBlur={onInputChange}
            />
            <div className="food-item__inc" onClick={() => onCounter('inc')}>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="food-item__btn-order" onClick={onOrderFood}>Замовити</div>
        </div>
      </div>
    </div>
  )
}

export default FoodItem;