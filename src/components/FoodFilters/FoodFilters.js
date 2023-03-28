import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { foodChangingActiveFilter } from "../../store/foodSlice";

import "./foodFilters.scss";

const FoodFilters = () => {
  const dispatch = useDispatch();
  const activeFoodFilter = useSelector((state) => state.food.activeFoodFilter);

  const [activeFilter, setActiveFilter] = useState(activeFoodFilter);
  const foodListData = [
    { name: "pizza", label: "ПІЦА" },
    { name: "burger", label: "БУРГЕР IS BACK" },
    { name: "wings", label: "КРИЛА" },
    { name: "frying", label: "ФРІТЮР" },
    { name: "beer", label: "ПИВО" },
    { name: "drinksAsauces", label: "Напої / Cоуси" },
  ];

  const onFilterSelect = (e) => {
    const target = e.target;

    if (target.className === "food-filter__item ") {
      setActiveFilter({
        name: target.getAttribute("data-name"),
        label: target.textContent,
      });
    } else if (target.className === "drop-down-list") {
      setActiveFilter({
        name: target.value,
        label: target.selectedOptions[0].innerText,
      });
    }
  };

  const foodItemsUl = foodListData.map(({ name, label }) => {
    const active = activeFilter.name === name;
    const clazz = active ? "active-btn" : "";
    return (
      <li
        className={`food-filter__item ${clazz}`}
        key={name}
        data-name={name}
        onClick={(e) => onFilterSelect(e)}
      >
        {label}
      </li>
    );
  });

  const foodItemOptions = foodListData.map(({ name, label }) => {
    return (
      <option className="drop-down-list__item" key={name} value={name}>
        {label}
      </option>
    );
  });

  useEffect(() => {
    dispatch(foodChangingActiveFilter(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <div className="food-line-outer">
        <div className="food-line-inner run">
          <div className="food-line-inner-item">
            NEW!!! Години роботи: з 11:00 до 21:30 без вихідних
          </div>
          <div className="food-line-inner-item">
            NEW!!! Години роботи: з 11:00 до 21:30 без вихідних
          </div>
        </div>
      </div>
      <div className="food-filter food-filter_content">
        <ul className="food-filter__list">{foodItemsUl}</ul>
        <div className="food-filter_wrapper">
          <select
            name="food-filter"
            className="drop-down-list"
            aria-label="Default select example"
            onChange={(e) => onFilterSelect(e)}
            value={activeFilter.name}
          >
            {foodItemOptions}
          </select>
        </div>
      </div>
    </>
  );
};

export default FoodFilters;
