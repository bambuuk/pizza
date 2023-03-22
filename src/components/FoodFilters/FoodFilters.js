import './foodFilters.scss';

const FoodFilters = () => {
  return (
    <div className="food-filter food-filter_content">
      <ul className="food-filter__list">
        <li className="food-filter__item active-btn">ПІЦА</li>
        <li className="food-filter__item">БУРГЕР IS BACK</li>
        <li className="food-filter__item">КРИЛА</li>
        <li className="food-filter__item">ФРІТЮР</li>
        <li className="food-filter__item">ПИВО</li>
        <li className="food-filter__item">Напої / Cоуси</li>
      </ul>
      <div className="food-filter_wrapper">
        <select name="food-filter" className="drop-down-list">
          <option className="drop-down-list__item">ПІЦА</option>
          <option className="drop-down-list__item">БУРГЕР IS BACK</option>
          <option className="drop-down-list__item">КРИЛА</option>
          <option className="drop-down-list__item">ФРІТЮР</option>
          <option className="drop-down-list__item">ПИВО</option>
          <option className="drop-down-list__item">Напої / Cоуси</option>
        </select>
      </div>
    </div>
  )
}

export default FoodFilters;