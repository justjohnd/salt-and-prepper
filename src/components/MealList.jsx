import React, { useState } from 'react';
import Meal from './Meal';

export default function MealList(props) {
  const results = props.meals.results;
  return (
    <main>
      <section className="nutrients">
        {/* Calculates TOTALS for all meals generate */}
        {/* <h1>Macros</h1>
        <ul>
          <li>Calories: {props.calories.toFixed(0)}</li>
          <li>
            Difference from target: {props.target - props.calories.toFixed(0)}{' '}
          </li>
          <li>Protein: {props.protein.toFixed(0)}</li>
          <li>Fat: {props.fat.toFixed(0)}</li>
          <li>Carbohydrates: {props.carbs.toFixed(0)}</li>
          <li>Sugar: {props.sugar.toFixed(0)}</li>
        </ul> */}
      </section>

      <section className="meals">
        {results.map(meal => {
          return (
            <Meal key={meal.id} deleteMeal={props.deleteMeal} meal={meal} />
          );
        })}
      </section>
    </main>
  );
}
