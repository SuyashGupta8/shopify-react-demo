import React from "react";

const Filter = ({ aggregation, text, id, type, name, onChangeHandler,onClearHandler, isSelected}) => {
  return (
    <div style={{marginLeft:'50px'}}>
      <h4>{text}</h4>
      <button name={name} onClick={onClearHandler}>Clear</button>
      {aggregation.map((e,i) => {
        return (
          <div key={`${id}${i}`}><input checked={e.isChecked} type={type} onChange={onChangeHandler} id={`${id}${i}`} name={name} value={e.keys}/><label htmlFor={`${id}${i}`}>{e.value}</label></div>
        );
      })}
    </div>
  );
};

export default Filter;
