import React, { useState } from 'react';
import MealList from './MealList';
import KEYWORDS, {
  DONT_INCLUDE,
  MUST_ADD_CALORIES,
  BAD_API_IDS,
} from '../findWord';


function MealPlan(props) {
  let target = props.userCalAverage;

  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [meals, setMeals] = useState();
  const [diet, setDiet] = useState('vegan');
    const [isChecked, setIsChecked] = useState(
      new Array(DIETS.length).fill(false)
    );
const [totalCalories, setTotalCalories] = useState('');
const [differenceFromTarget, setDifferenceFromTarget] = useState('');

  function deleteMeal(foundId) {
    // const deleteMealCalories = meals.filter(meal => {
    //   if (meal.id === foundId) {
    //     console.log('Deleted meal');
    //     return meal;
    //   }
    // });

    // setMeals(prevVal => {
    //   return prevVal.filter(meal => {
    //     return meal.id !== foundId;
    //   });
    // });
    // getMeals();
  }
        
    function getMeals() {   
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&type=main course,side dish,snack,appetizer,salad,soup,fingerfood&excludeIngredients=white chocolate,vanilla bean paste,semi sweet chocolate chips&fillIngredients=true&instructionsRequired=true&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${target}&sort=random&number=2`
      )
        .then(response => response.json())
        .then(data => {
          const keywordsSeen = [];
          const rejectionReason = [];

          const scrubbedResults = data.results.map(result => {
            result.dontInclude = false;
            result.addCalories = false;

            if (BAD_API_IDS[result.id]) {
              result.dontInclude = true;
              rejectionReason.push(
                `Rejection Reason: Based on recipe ${result.id}, this recipe is missing kinformation.`
              );
            }

            if (dontIncludeCheck(result.title.toLowerCase())) {
              result.dontInclude = true;
            }

            if (addCaloriesCheck(result.title.toLowerCase())) {
              result.addCalories = true;
              let calories = result.nutrition.nutrients[0].amount;
              calories = calories + 200;
            }

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
                  keywordsSeen.forEach(e => {
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
                console.log('calories added to meal');
                return true;
              } else {
                console.log('no calories added to meal');
                return false;
              }
            }
          }

          return filteredResults;
        })
        .then(filteredResults => {
          // Create an array of calories for each meal to pass to combinations function
          const caloriesArray = filteredResults.map(result => {
            return result.nutrition.nutrients[0].amount;
          });

          // Find all combinations of meals
          const findCombinations = array => {
            const output = [];
            if (array.length === 1) {
              output.push([array[0]]);
            } else {
              for (let i = 0; i <= array.length - 1; i++) {
                let firstPosition = array[i];
                for (let j = i + 1; j <= array.length - 1; j++) {
                  let secondPosition = array[j];
                  output.push([firstPosition, i, secondPosition, j]);
                }
              }
            }
            return output;
          };

          const calorieComboArrays = findCombinations(caloriesArray);

          const diffFromTarget = calorieComboArrays.map(array => {
            const calorieArrayTotal = array
              .reduce((prev, cur) => prev + cur)
              .toFixed(0);
            setTotalCalories(calorieArrayTotal);
            array.push(Math.abs(calorieArrayTotal - target));
            return array;
          });

          const differences = diffFromTarget.map(array => array.at(-1));
          const closestToTarget = differences.indexOf(Math.min(...differences));
          const bestCombo = diffFromTarget[closestToTarget];

          const filtered = filteredResults.filter((result, index) => {
            if (index === bestCombo[1] || index === bestCombo[3]) {
              return result;
            }
          });

          const difference = Math.abs(
            filtered[0].nutrition.nutrients[0].amount +
              filtered[1].nutrition.nutrients[0].amount -
              target
          ).toFixed(0);

          setDifferenceFromTarget(difference);

          setMeals(filtered);
        })
        .catch(() => {
          console.log(`Error`);
        });
  }

  const handleChecked = (position) => {
    setIsChecked((prevVal) => prevVal.map((item, index) =>
      index === position ? item = true : item = false
    ));
    setDiet(DIETS[position]);
  };

  return (
    <div>
      <section className="controls">
        <div className="control">
          <p>Diet</p>
          <ul className="diet-options">
            {DIETS.map((diet, index) => {
              return (
                <li key={index}>
                  <input
                    title={diet}
                    type="checkbox"
                    onChange={() => handleChecked(index)}
                    checked={isChecked[index]}
                  />
                  <label htmlFor={diet}>{diet}</label>
                </li>
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
          <button className="btn-primary" onClick={getMeals}>
            Get Daily Meal Plan
          </button>
        </div>
      </section>
      <div>Total Calories: {totalCalories}</div>
      <div>Difference from Target: {differenceFromTarget}</div>
      {meals && (
        <MealList
          meals={meals}
          target={target}
          deleteMeal={deleteMeal}
        />
      )}
    </div>
  );
}

export default MealPlan;
