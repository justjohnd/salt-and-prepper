import React, { useState, useEffect } from 'react';

import Meal from './Meal';
import KEYWORDS, {
  DONT_INCLUDE,
  USED_INGREDIENT_COUNT,
  DONT_ADD_CALORIES,
  MUST_ADD_CALORIES,
  BAD_API_IDS,
} from '../findWord';

function MealList(props) {
  const keywordsSeen = [];
  let dontInclude = false;
  let addCalories = false;
  const results = props.meals.results;
  const rejectionReason = [];
  let warning;
  let caloriesArray = [];
  let caloriesTotal;

    // Scrub data
    const resultsCopy = [...results];
    const scrubbedResults = resultsCopy.map((result) => {
      result.dontInclude = false

      if (
        BAD_API_IDS[result.id] 
      ) {
        result.dontInclude = true;
        rejectionReason.push(
          `Rejection Reason: Based on recipe ${result.id}, this recipe is missing kinformation.`
        );
      }

      findWord(result.title.toLowerCase());

      return result
    });

    const filteredResults = scrubbedResults.filter(result => {
      if (result.dontInclude === false) {
        return result;
      }
    });

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
    }
  }

  function addCaloriesCheck(string) {
    addCalories = false;
    const words = string.split(' ');
        for (const word of words) {
          if (MUST_ADD_CALORIES[word]) {
            return addCalories = true;
          }
        }
  }

  // Find total for macros
//   if (filteredResults !== []) {
//   caloriesArray = filteredResults.map((e) => {
//     let title = e.title;
//     let calories = e.nutrition.nutrients[0].amount;
//     addCaloriesCheck(title);

//     if (addCalories) {
//       calories += 200;
//     }

//     return calories.toFixed(0);
//   });

//   caloriesTotal = caloriesArray.reduce((prev, cur) => {
//     return prev + cur;
//   });
// }


  return (
    <main>
      <section className="nutrients">
        {/* Calculates TOTALS for all meals generate */}
        {/* <h1>Total Calories: {caloriesTotal}</h1> */}
        {filteredResults === [] && <h1>Sorry, no results matched criteria</h1>}

      </section>

      <section className="meals">
        {filteredResults.map(meal => {
          const [calories, protein, fat, carbohydrates, sugar] =
            meal.nutrition.nutrients;
          calories.addCalories = false;

          {
            /* Check to see if calories should be added */
          }
          addCaloriesCheck(meal.title);
          if (addCalories) {
            calories.amount += 200;
            console.log(`calories were added to ${meal.title}`);
            calories.addCalories = true;
          } else {
            console.log(`no calories were added to ${meal.title}`);
          }

          console.log(meal);
          console.log(filteredResults);

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
              addCalories={calories.addCalories}
            />
          );
        })}
      </section>
    </main>
  );
      }

export default MealList;
