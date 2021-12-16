import React from 'react';

function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick} type="submit">
      {props.buttonText}
    </button>
  );
}

export default Button;
