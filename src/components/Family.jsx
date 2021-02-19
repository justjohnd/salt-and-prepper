import React from 'react';
import Card from './Card';
import family, { colors } from '../family';

function createFamily(family) {
  family.color = colors[family.id - 1];

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
      {props.submitted ? (
        <div>
          <div className="container">{family.map(createFamily)};</div>
        </div>
      ) : null}
    </div>
  );
}

export default Family;
