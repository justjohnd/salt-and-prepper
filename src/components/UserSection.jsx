import React, { useState } from 'react';
import H2 from './H2';
import Button from './Button';
import UserCards from './UserCards';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function UserSection() {
  const [formVisibility, setFormVisibility] = useState(false);
  const [message, setMessage] = useState(
    'Here are the current people on your meal plan:'
  );

  function changeFormVisibility() {
    setFormVisibility((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <div>
      <div className="form align-left">
        <H2 message={message} />
        <div className="container">
          <UserCards
            showForm={formVisibility}
            toggleForm={changeFormVisibility}
          />
          {!formVisibility && (
            <Button
              className="btn-round"
              onClick={() => {
                setFormVisibility(true);
                setMessage('Add a new person to your group:');
              }}
              buttonText={<PersonAddIcon />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSection;
