import React, { useState } from 'react';
import MealList from './MealList';
import Checkbox from './Checkbox';

function MealPlan(props) {
  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(props.userCalAverage);
  const [diet, setDiet] = useState('');

  function handleDiet(e) {
    setDiet();
  }

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&sort=random&number=4`
    )
      .then(response => response.json())
      .then(data => {
        setMealData(data);
      })
      .catch(() => {
        console.log('error');
      });
  }

  return (
    <div>
      <section className="controls">
        <div className="control">
          <p>Diet</p>
          <ul className="diet-options">
            {DIETS.map((diet, index) => {
              return (
                <Checkbox
                  key={index}
                  title={diet}
                  onClick={handleDiet}
                  htmlFor={diet}
                  label={diet}
                />
              );
            })}
          </ul>
        </div>
        <div className="control">
          <input
            className="d-block"
            type="number"
            placeholder={props.userCalAverage}
            onChange={e => e.target.value}
          />
          <button onClick={getMealData}>Get Daily Meal Plan</button>
        </div>
      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default MealPlan;
