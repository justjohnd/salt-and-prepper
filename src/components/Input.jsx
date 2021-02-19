import React from 'react';

function Input(props) {
  return (
    <input
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      label={props.label}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
