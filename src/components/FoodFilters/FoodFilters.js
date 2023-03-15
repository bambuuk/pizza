import './foodFilters.scss';

const FoodFilters = () => {
  return (
    <div className="food-filter">
      <ul className="food-filter__list">
        <li className="food-filter__item active-btn">ПІЦА</li>
        <li className="food-filter__item">БУРГЕР IS BACK</li>
        <li className="food-filter__item">КРИЛА</li>
        <li className="food-filter__item">ФРІТЮР</li>
        <li className="food-filter__item">ПИВО</li>
        <li className="food-filter__item">Напої / Cоуси</li>
      </ul>
    </div>
  )
}

export default FoodFilters;