import React from 'react';

function Input(props) {
  return (
    <label>
      {props.label}
      <input
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
      />
    </label>
  );
}

export default Input;
