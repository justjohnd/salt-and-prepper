import React, { useState } from 'react';
import { colors } from '../users';
import Card from './Card';
import ageCalc from '../ageCalc';
import calCalc from '../calCalc';

function UserCards(props) {
  const userCalArray = []; //This array collects userCal, which will be used to calculate the average calories for all memters in the User Section
  return (
    <div>
      <div className="container">
        {props.users.map(user => {
          const userAge = ageCalc(user.birthday);
          let userGender;
          user.gender === 1
            ? (userGender = '')
            : user.gender === 2
            ? (userGender = 'Male')
            : (userGender = 'Female');
          let userCal;
          if (userAge < 4) {
            userCal = 0;
          } else if (userAge && userGender && user.calTarget) {
            userCal = calCalc(userAge, userGender, user.calTarget);
            userCalArray.push(userCal);
          } else {
            userCal = '';
          }

          return (
            <Card
              user={user}
              key={user.id}
              id={user.id}
              color={colors[user.id - 1]}
              name={user.fullName}
              age={userAge}
              birthday={user.birthday}
              gender={userGender}
              calories={userCal}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              changeFormEditVisibility={props.changeFormEditVisibility}
              formEditVisibility={props.formEditVisibility}
              formVisibility={props.formVisibility}
              changeFormVisibility={props.changeFormVisibility}
            />
          );
        })}
        {props.addUserCal(userCalArray)}
      </div>
    </div>
  );
}

export default UserCards;
