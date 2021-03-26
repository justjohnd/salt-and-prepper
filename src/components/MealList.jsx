import React from 'react';
import Meal from './Meal';

export default function MealList({ mealData }) {
  let totals = [];

  if (mealData.results !== []) {
    //If API returns empty array results cannot be mapped, and page will crash
    for (let i = 0; i < 5; i++) {
      const totalingArray = mealData.results.map(
        result => result.nutrition.nutrients[i].amount
      );
      const nutrientTotal = totalingArray.reduce((acc, cur) => acc + cur);
      totals.push(nutrientTotal);
    }
  } else {
    totals = ['', '', '', '', ''];
    console.log(
      'Error: API call returned empty array. Check the endpoint parameters'
    );
  }

  const [calories, protein, fat, carbs, sugar] = totals;

  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calories: {calories.toFixed(0)}</li>
          <li>Difference from target: {2000 - calories.toFixed(0)} </li>
          <li>Protein: {protein.toFixed(0)}</li>
          <li>Fat: {fat.toFixed(0)}</li>
          <li>Carbohydrates: {carbs.toFixed(0)}</li>
          <li>Sugar: {sugar.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals">
        {mealData.results.map(meal => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}
