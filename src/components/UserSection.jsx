import React, { useState } from 'react';
import Button from './Button';
import H2 from './H2';
import UserCards from './UserCards';

function UserSection() {
  const [formVisibility, setFormVisibility] = useState(false);
  const [message, setMessage] = useState(
    'Here are the current people on your meal plan:'
  );

  function changeFormVisibility() {
    formVisibility ? setFormVisibility(false) : setFormVisibility(true);
  }

  function handleClick() {
    setFormVisibility(true);
    setMessage('Add a new person to your group:');
  }

  return (
    <div>
      <div className="form align-left">
        <H2 message={message} />
        <div className="container">
          <UserCards
            formVisibility={formVisibility}
            changeFormVisibility={changeFormVisibility}
          />
          {!formVisibility && (
            <Button
              className="btn-round"
              onClick={handleClick}
              buttonText={<i className="fas fa-2x fa-user-plus"></i>}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSection;
