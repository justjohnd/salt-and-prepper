import React, { useState } from 'react';
import MealList from './MealList';
import KEYWORDS, {
  DONT_INCLUDE,
  MUST_ADD_CALORIES,
  BAD_API_IDS,
} from '../findWord';
import TEST_MEALS from "./testMeals";
import TEST_RECIPES from './testMeals';

function MealPlan(props) {
  let target = props.userCalAverage;
  const rejectionReason = [];

  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [meals, setMeals] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState('vegan');
  const [isChecked, setIsChecked] = useState(
    new Array(DIETS.length).fill(false)
  );
  const [message, setMessage] = useState('');
  const [totalCalories, setTotalCalories] = useState('');
  const [differenceFromTarget, setDifferenceFromTarget] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  
  // Set the views for ingredients and instructions sections in child components
  const [instructionsDisplay, setInstructionsDisplay] = useState([false, false]);
  const [ingredientsDisplay, setIngredientsDisplay] = useState([false, false]);

  // Handle Displays for ingredients and instructions
     function handleInstructionsCallback(index) {
       setInstructionsDisplay((prevValue) => {
          const prevValueCopy = [...prevValue];
          prevValueCopy.splice(index, 1, !prevValue[index]);
          return prevValueCopy;
       });
     }

     function handleIngredientsCallback(index) {
       setIngredientsDisplay((prevValue) => {
        const prevValueCopy = [...prevValue];
        prevValueCopy.splice(index, 1, !prevValue[index]);
        return prevValueCopy;
       });
     }
        
    function getMeals() {
      setMeals([]);
      setRecipes([]); 
      setIngredientsDisplay([false, false]);
      setInstructionsDisplay([false, false]);
      setDisableButton(true);

      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&type=main course,side dish,snack,appetizer,salad,soup,fingerfood&excludeIngredients=white chocolate,vanilla bean paste,semi sweet chocolate chips&fillIngredients=true&instructionsRequired=true&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${target}&sort=random&number=7` // Ideal is 8 calls
      )
        .then(response => response.json())
        .then(data => {
          const keywordsSeen = [];
          const scrubbedResults = data.results.map(result => {
            result.dontInclude = false;
            result.addCalories = false;

          function dontIncludeCheck(string) {
            const words = string.split(' ');

            for (const word of words) {
              if (KEYWORDS[word]) {
                if (keywordsSeen === []) {
                  keywordsSeen.push(word);
                } else {
                  keywordsSeen.forEach(e => {
                    if (e === word) {
                      // console.log(
                      //   `Rejection Reason: '${string} is similar or identical recipe already being used`
                      // );
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
            // console.log(`Words: ${words}`);
            for (const word of words) {
              if (MUST_ADD_CALORIES[word]) {
                console.log('calories added to meal');
                return true;
              } else {
                // console.log('no calories added to meal');
                return false;
              }
            }
          }

          if (BAD_API_IDS[result.id]) {
              result.dontInclude = true;
              rejectionReason.push(
                `Rejection Reason: Based on recipe ${result.id}, this recipe is missing kinformation.`
              );
              // console.log(`Bad API reject?: ${rejectionReason}`);
          }
          if (dontIncludeCheck(result.title.toLowerCase())) {
              result.dontInclude = true;
              // console.log(`dontIncludeCheck: true: ${result.id}`);
          }
          if (addCaloriesCheck(result.title.toLowerCase())) {
              result.addCalories = true;
              result.nutrition.nutrients[0].amount =
                result.nutrition.nutrients[0].amount + 200;
                // console.log(`added calories: ${result.id}`)
          }
          return result;
          });
          // console.log(scrubbedResults);

          let filteredResults = scrubbedResults.filter(result => {
            if (result.dontInclude === false) {
              return result;
            }
          });
          // console.log("filtered results before instructions check");
          // console.log(filteredResults);
          return filteredResults;
        })
        .then(filteredResults => {
          let noRecipeResults = [];        
          const idArray = filteredResults.map(result => result.id);

          //This is hotfix to make an unnecesary API call to avoid  400 error. True solution is to isolate the code that uses noRecipeResults to a seperate then statmement
          let arrayString = '';
          if (filteredResults === []) {
            arrayString = 624304;
          } else {
            arrayString = idArray.toString();
          }
  
          fetch(
            `https://api.spoonacular.com/recipes/informationBulk?ids=${arrayString}&apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false`
          )
            .then(response => response.json())
            .then(recipes => {
              //Clean up recipe summaries
              if (recipes.status !== 'failure') {
              const recipesSummaryEdit = recipes.map(recipe => {
                let array = recipe.summary.split(' ');
                let slicePoint = array.indexOf('Similar');
                array = array.slice(0, slicePoint);
                let newSummary = array.join(' ');
                // console.log(recipe.summary);
                // console.log(newSummary);
                let newObject = Object.assign({}, recipe, {
                  summary: newSummary,
                });

                return newObject;
              });

              setRecipes(recipesSummaryEdit);
              }

              // console.log(recipes);

              //Create a hashmap of recipe id's that do not include analyzed instructions
              const noInstructionsHash = recipes => {
                let output = {};
                for (let i = 0; i < recipes.length; i++) {
                  let length = Object.values(
                    recipes[i].analyzedInstructions
                  ).length;
                  if (length === 0) {
                    let myKey = Object.values(recipes[i])[19];
                    output[myKey] = 'true';
                  }
                }
                return output;
              };

              const hashed = noInstructionsHash(recipes);

              //Remove any items that don't have recipes
              function eliminator(hash, mealsData) {
                for (let i = 0; i < mealsData.length; i++) {
                  if (hash[mealsData[i].id]) {
                    mealsData.splice(i, 1);
                    i--;
                  }
                }

                return mealsData;
              }

              noRecipeResults = eliminator(hashed, filteredResults);
              // console.log(noRecipeResults);

              // Create an array of calories for each meal to pass to combinations function
              if (noRecipeResults.length !== 0) {
                const caloriesArray = noRecipeResults.map(result => {
                  return result.nutrition.nutrients[0].amount;
                });
                // console.log(
                //   `Array of all items' calories only: ${caloriesArray}`
                // );

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
                // console.log(
                //   `Array of ideal calorie pairs: ${calorieComboArrays}`
                // );

                const diffFromTarget = calorieComboArrays.map(array => {
                  const calorieArrayTotal = array
                    .reduce((prev, cur) => prev + cur)
                    .toFixed(0);
                  array.push(Math.abs(calorieArrayTotal - target));
                  return array;
                });
                // console.log(
                //   `Inclusion of difference from target for each pair: ${diffFromTarget}`
                // );

                const differences = diffFromTarget.map(array => array.at(-1));
                // console.log(
                //   `Array of differences from target only: ${differences}`
                // );

                const closestToTarget = differences.indexOf(
                  Math.min(...differences)
                );
                // console.log(
                //   `Index number for smallest difference combo: ${closestToTarget}`
                // );

                const bestCombo = diffFromTarget[closestToTarget];
                // console.log(`Best array combination: ${bestCombo}`);

                let filtered = [];
                let calorieTotal = '';
                // console.log(noRecipeResults);
                if (noRecipeResults.length === 1) {
                  filtered = noRecipeResults;
                  // console.log(filtered);
                  calorieTotal =
                    filtered[0].nutrition.nutrients[0].amount.toFixed(0);
                } else if (noRecipeResults.length > 1) {
                  filtered = noRecipeResults.filter((result, index) => {
                    if (index === bestCombo[1] || index === bestCombo[3]) {
                      return result;
                    }
                  });
                  // console.log(filtered);
                  calorieTotal = (
                    filtered[0].nutrition.nutrients[0].amount +
                    filtered[1].nutrition.nutrients[0].amount
                  ).toFixed(0);
                }
                // console.log(calorieTotal);

                setTotalCalories(calorieTotal);

                const difference = Math.abs(calorieTotal - target).toFixed(0);

                setDifferenceFromTarget(difference);
                // console.log(filtered);

                //Capitalize all first letters in title
                const filteredTitles = filtered.map(meal => {
                  let words = meal.title.split(' ');
                  let upperCaseWords = words.map(
                    word => word.charAt(0).toUpperCase() + word.substring(1)
                  );
                  let newTitle = upperCaseWords.join(' ');
                  // console.log(meal.title);
                  // console.log(newTitle);
                  let newObject = Object.assign({}, meal, {
                    title: newTitle,
                  });
                  // console.log(newObject);

                  return newObject;
                });

                // console.log(filteredTitles);
                if (filteredTitles.length === 0) {
                  setMessage('Sorry, no results were found');
                }

                setMeals(filteredTitles);
              } else {
                setMessage('Sorry, no results were found');
              }
            })
            .catch(() => {
              console.log(`Error`);
            });
          })
        .catch(() => {
          console.log(`Error`);
        })
        .finally(() => setDisableButton(false));
  }

  const handleChecked = (position) => {
    setIsChecked((prevVal) => prevVal.map((item, index) =>
      index === position ? item = true : item = false
    ));
    setDiet(DIETS[position]);
  };

  return (
    <div>
      <section className="controls flex-center">
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
          <p>Average Calorie Target</p>
          <input
            className="d-block calorie-field"
            type="number"
            placeholder={props.userCalAverage}
            onChange={e => e.target.value}
          />
          <button
            disabled={disableButton}
            className="btn-primary btn-get-meal"
            onClick={getMeals}
          >
            Get My Meal!
          </button>
        </div>
      </section>
      <h1>{message}</h1>
      {meals.length !== 0 && (
        <section className="results-summary">
          <h1>Here is your suggested meal!</h1>
          <h3 className="mb-0">{`Total Calories: ${totalCalories}`}</h3>
          <p className="mt-0">{`Difference from Target: ${differenceFromTarget}`}</p>
        </section>
      )}
      {meals.length !== 0 && (
        <MealList
          message={message}
          recipes={recipes}
          ingredientsDisplay={ingredientsDisplay}
          instructionsDisplay={instructionsDisplay}
          handleInstructionsCallback={handleInstructionsCallback}
          handleIngredientsCallback={handleIngredientsCallback}
          meals={meals}
          target={target}
        />
      )}
    </div>
  );
}

export default MealPlan;
