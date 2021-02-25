import React from 'react';
import Card from './Card';
import family, { colors } from '../family';
import male, { female } from '../calRequirements';

function createFamily(family) {
  //Assign color
  family.color = colors[family.id - 1];

  //Calculate age
  let today = new Date();
  let age = '';
  if (family.birthday) {
    let birthDate = new Date(family.birthday);
    age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  }
  family.age = age;

  //Calculate calorie requirement
  let calArray = [];
  if (family.gender === 'Male') {
    calArray = male;
  } else {
    calArray = female;
  }

  const ageRange = calArray.filter((e) => age >= e.min && age <= e.max);
  const activity = ageRange[0].activityLevels;
  const activityLevel = activity.find((e) => e.activity === family.calTarget);
  const calories = (activityLevel.min + activityLevel.max) / 2;
  family.calories = calories;

  return (
    <Card
      key={family.id}
      color={family.color}
      name={family.fullName}
      age={family.age}
      gender={family.gender}
      calories={family.calories}
    />
  );
}

function Family(props) {
  return (
    <div>
      <div>
        <div className="container">{family.map(createFamily)};</div>
      </div>
    </div>
  );
}

export default Family;
