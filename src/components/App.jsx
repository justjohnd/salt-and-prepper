import React from 'react';
import Card from './Card';
import family, { colors } from '../family';

function createFamily(family) {
  family.color = colors[family.id - 1];

  return (
    <div>
      <Card
        key={family.id}
        color={family.color}
        name={family.name}
        age={family.age}
        gender={family.gender}
        calTarget={family.calTarget}
      />
    </div>
  );
}

function App() {
  return <div>{family.map(createFamily)}</div>;
}

export default App;
