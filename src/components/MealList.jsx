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
  const results = props.meals.results;
  const rejectionReason = [];

    // Scrub data
    const resultsCopy = [...results];
    const scrubbedResults = resultsCopy.map((result) => {
      result.dontInclude = false;
      result.addCalories = false;

      if (BAD_API_IDS[result.id]) {
        result.dontInclude = true;
        rejectionReason.push(
          `Rejection Reason: Based on recipe ${result.id}, this recipe is missing kinformation.`
        );
      }

      dontIncludeCheck(result.title.toLowerCase());

      if (addCaloriesCheck(result.title.toLowerCase())) {
        result.addCalories = true;
        let calories = result.nutrition.nutrients[0].amount;
        calories += 200;
      };

      return result;
    });

    const filteredResults = scrubbedResults.filter(result => {
      if (result.dontInclude === false) {
        return result;
      }
    });

  function dontIncludeCheck(string) {
    const words = string.split(' ');

    for (const word of words) {
      if (KEYWORDS[word]) {
        if (keywordsSeen === []) {
          keywordsSeen.push(word);
        } else {
          keywordsSeen.forEach((e) => {
            if (e === word) {
              console.log(
                `Rejection Reason: '${string} is similar or identical recipe already being used`
              );
              return true;
            } else {
              keywordsSeen.push(word);
            }
          });
        }
      }

      if (DONT_INCLUDE[word]) {
        rejectionReason.push(
          `Title (${string})indicates that this food is a desert, therfore don't include`
        );
        return true;
      }
    }
  }

  function addCaloriesCheck(string) {
    const words = string.split(' ');
        for (const word of words) {
          if (MUST_ADD_CALORIES[word]) {
            console.log("calories added to meal");
            return true;
          } else {
          console.log("no calories added to meal");
          return false;
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
          {/* calories.addCalories = false; */}

          {
            /* Check to see if calories should be added */
          }
          {/* addCaloriesCheck(meal.title);
          if (addCalories) {
            calories.amount += 200;
            console.log(`calories were added to ${meal.title}`);
            calories.addCalories = true;
          } else {
            console.log(`no calories were added to ${meal.title}`);
          } */}

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
              addCalories={meal.addCalories}
            />
          );
        })}
      </section>
    </main>
  );
      }

export default MealList;
