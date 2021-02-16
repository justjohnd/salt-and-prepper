import React from 'react';

function Input(props) {
  return (
    <input
      label={props.label}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
