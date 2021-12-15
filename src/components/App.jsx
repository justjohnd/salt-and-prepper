import React, { useState } from 'react';
import UserSection from './UserSection';
import MealPlan from './MealPlan';

function App() {
  const [userCalAverage, setUserCalAverage] = useState('');

  function addUserCal(userCalArray) {

    let length;
    if (userCalArray.length === 0) {
      length = 1;
    } else {
      length = userCalArray.length;
    }

    console.log(length);

    const avgCalPerUser = userCalArray.reduce((acc, cur) => {
        return acc + cur;
      }, 0) / length;
      
// Divide by 3 to get a single meal
    let calAverage = (avgCalPerUser / 3).toFixed(0);
          console.log(calAverage);
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
