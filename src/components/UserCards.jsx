import React, { useState } from 'react';
import Card from './Card';
import USER_DATA, { colors } from '../users';
import ageCalc from '../ageCalc';
import calCalc from '../calCalc';
import FormAddPerson from './FormAddPerson';

function UserCards(props) {
  const [users, setUsers] = useState(USER_DATA);

  function addNewUser(newUser) {
    setUsers([...users, newUser]);
  }

  return (
    <div>
      {props.showForm && (
        <FormAddPerson
          showForm={props.showForm}
          toggleForm={props.toggleForm}
          addNewUser={addNewUser}
        />
      )}
      <div className="container">
        {users.map((user) => {
          const userAge = ageCalc(user.birthday);
          let userGender;
          user.gender === 0
            ? (userGender = '')
            : user.gender === 1
            ? (userGender = 'Male')
            : (userGender = 'Female');

          return (
            <Card
              key={user.id}
              color={colors[user.id - 1]}
              name={user.fullName}
              age={userAge}
              gender={userGender}
              calories={calCalc(userAge, userGender, user.calTarget)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserCards;
