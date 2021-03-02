import React, { useState } from 'react';

function Button(props) {
  return (
    <button onClick={props.onClick} type="submit">
      {props.buttonText}
    </button>
  );
}

export default Button;
