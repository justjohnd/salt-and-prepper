import React, { useState } from 'react';
import Family from './Family';
import H2 from './H2';

function Form() {
  const [message, setMessage] = useState(
    'Here are the current people on your meal plan:'
  );

  return (
    <div>
      <form className="form align-left">
        <H2 message={message} />
        <Family />
      </form>
    </div>
  );
}

export default Form;
