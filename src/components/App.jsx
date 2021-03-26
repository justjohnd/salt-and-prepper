import React, { useState } from 'react';
import UserSection from './UserSection';
import MealPlan from './MealPlan';

function App() {
  const [userCalAverage, setUserCalAverage] = useState('');

  function addUserCal(userCalArray) {
    const calAverage = (
      userCalArray.reduce((acc, cur) => acc + cur) / userCalArray.length
    ).toFixed(0);
    setUserCalAverage(calAverage);
  }

  const calTarget = 2000;

  return (
    <div>
      <UserSection addUserCal={addUserCal} />
      <MealPlan calTarget={calTarget} />
    </div>
  );
}

export default App;
