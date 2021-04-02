import React, { useState } from 'react';
import Meal from './Meal';

export default function MealList(props) {
  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calories: {props.calories.toFixed(0)}</li>
          <li>Difference from target: {2000 - props.calories.toFixed(0)} </li>
          <li>Protein: {props.protein.toFixed(0)}</li>
          <li>Fat: {props.fat.toFixed(0)}</li>
          <li>Carbohydrates: {props.carbs.toFixed(0)}</li>
          <li>Sugar: {props.sugar.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals">
        {props.meals.map(meal => {
          return <Meal key={meal.results[0].id} meal={meal} />;
        })}
      </section>
    </main>
  );
}
