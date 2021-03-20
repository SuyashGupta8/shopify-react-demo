import React from "react";
import Filter from "./Filter/Filter";

const FilterSideBar = ({ value, onChangeHandler,onClearHandler }) => {
  const keys = Object.keys(value);
  // This is the return statement
  return (
    <div>
      {keys.map((e, i) => {
        const key = value[e];
        return (
          <Filter
            key={key.id}
            aggregation={key.aggregation}
            text={key.text}
            id={key.id}
            onChangeHandler={onChangeHandler}
            onClearHandler={onClearHandler}
            name={key.name}
            type={key.type}
            isSelected={key.isSelected}
          />
        );
      })}
    </div>
  );
};

export default FilterSideBar;
