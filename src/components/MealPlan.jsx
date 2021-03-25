import React, { useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import MealList from './MealList';
import Checkbox from './Checkbox';

function MealPlan() {
  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [diet, setDiet] = useState('');

  function handleDiet(e) {
    setDiet(e.target.title);
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&timeFrame=day&targetCalories=${calories}&diet=${diet}`
    )
      .then(response => response.json())
      .then(data => {
        setMealData(data);
        console.log(data);
      })
      .catch(() => {
        console.log('error');
      });
  }

  return (
    <div className="con-plan">
      <section className="controls">
        <ul className="diets">
          {DIETS.map(diet => {
            return (
              <Checkbox
                title={diet}
                onClick={handleDiet}
                htmlFor={diet}
                label={diet}
              />
            );
          })}
        </ul>
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
        <button onClick={getMealData}>Get Daily Meal Plan</button>
        {mealData && <MealList mealData={mealData} />}
      </section>
    </div>
  );
}

export default MealPlan;
