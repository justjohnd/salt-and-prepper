import React from 'react';

function Checkbox(props) {
  return (
    <li>
      <input title={props.title} type="checkbox" onClick={props.onClick} />
      <label htmlFor={props.htmlFor}>{props.label}</label>
    </li>
  );
}

export default Checkbox;
