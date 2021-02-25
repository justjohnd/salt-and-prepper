import React from 'react';
import Card from './Card';
import family, { colors } from '../family';

function createFamily(family) {
  family.color = colors[family.id - 1];

  let today = new Date();
  let birthDate = new Date(family.birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  family.age = age;

  return (
    <Card
      key={family.id}
      color={family.color}
      name={family.fullName}
      age={family.age}
      gender={family.gender}
      calTarget={family.calTarget}
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
