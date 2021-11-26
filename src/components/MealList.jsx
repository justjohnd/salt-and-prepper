import React, { useState, useEffect } from 'react';

import Meal from './Meal';
import KEYWORDS, {
  DONT_INCLUDE,
  DONT_ADD_CALORIES,
  MUST_ADD_CALORIES,
  BAD_API_IDS,
} from '../findWord';

function MealList(props) {
  const keywordsSeen = [];
  let dontInclude = false;
  let addCalories = true;
  const results = props.meals.results;
  const rejectionReason = [];

  for (let i = 0; i < results.length; i++) {
    dontInclude = false;
    addCalories = true;
     if (BAD_API_IDS[results[i].id]) {
        dontInclude = true;
        rejectionReason.push(
          `Rejection Reason: Based on recipe ${results[i].id}, this recipe is missing key information.`
        );
      }

    findWord(results[i].title.toLowerCase());

    if (dontInclude) {
      console.log(rejectionReason);
      console.log(results[i]);
      props.handleCallback(i);
      if (results.length === 1) {
        break;
      } else {
        i--;
      }
    } else if (addCalories) {
      let calories = results[i].nutrition.nutrients[0].amount;
      calories = calories + 200;
      console.log(`calories were added to ${results[i].title}`);
      results[i].addCalories = true;
    } else {
      console.log(`no calories were added to ${results[i].title}`);
    }
  } 

  function findWord(string) {
    const words = string.split(' ');

    for (const word of words) {
      if (KEYWORDS[word]) {
        if (keywordsSeen === []) {
          keywordsSeen.push(word);
        } else {
          keywordsSeen.forEach((e) => {
            if (e === word) {
              dontInclude = true;
              console.log(
                `Rejection Reason: '${string} is similar or identical recipe already being used`
              );
            } else {
              keywordsSeen.push(word);
            }
          });
        }
      }

      if (DONT_INCLUDE[word]) {
        dontInclude = true;
        rejectionReason.push(
          `Title (${string})indicates that this food is a desert, therfore don't include`
        );
      }

      if (DONT_ADD_CALORIES[word]) {
        addCalories = false;
      }

      if (MUST_ADD_CALORIES[word]) {
        addCalories = true;
      }
    }
  }



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
          const [calories, protein, carbohydrates, fat, sugar] = meal.nutrition.nutrients;
          return (
            <Meal
              key={meal.id}
              deleteMeal={props.deleteMeal}
              meal={meal}
              calories={calories.amount.toFixed(0)}
              protein={protein.amount.toFixed(0)}
              fat={fat.amount.toFixed(0)}
              fat={carbohydrates.amount.toFixed(0)}
              sugar={sugar.amount.toFixed(0)}
            />
          );
        })}
      </section>
    </main>
  );
      }

export default MealList;
