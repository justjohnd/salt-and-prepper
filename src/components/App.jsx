import React, { useState } from 'react';
import UserSection from './UserSection';
import MealPlan from './MealPlan';

function App() {
  const [userCalAverage, setUserCalAverage] = useState('');

  function addUserCal(userCalArray) {
    const calAverage = (
      (userCalArray.reduce((acc, cur) => acc + cur) / userCalArray.length
    ) / 3).toFixed(0);
    setUserCalAverage(calAverage);
  }

  return (
    <div>
      <h1>The Great Meal Generator!</h1>
      <UserSection addUserCal={addUserCal} />
      <MealPlan userCalAverage={userCalAverage} />
    </div>
  );
}

export default App;
