import React, { useState, useEffect } from 'react';
import MealList from './MealList';
import Checkbox from './Checkbox';
import KEYWORDS, {
  DONT_INCLUDE,
  DONT_ADD_CALORIES,
  MUST_ADD_CALORIES,
  BAD_API_IDS,
} from '../findWord';

function MealPlan(props) {
  const keywordsSeen = [];
  const ids = [];
  const totals = [];
  let dontInclude = false;
  let addCalories = true;
  let runningCalTally = 0;
  let target = 1000; // Set this for testing. Typiocally props.userCalAverage;
  let rejectionReason = '';

  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [diet, setDiet] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [numberOfMeals, setNumberOfMeals] = useState(1);
  const [mealPairs, setMealPairs] = useState([
    {
      key: 1,
      meal1: {},
      meal2: {},
    },
    {
      key: 2,
      meal1: {},
      meal2: {},
    },
    {
      key: 3,
      meal1: {},
      meal2: {},
    },
  ]);

  // useEffect(() => {
  //   if (meal) {
  //     setMeals([...meals, meal]);
  //   }
  // }, [meal]);

  useEffect(() => {
    //This totals all macros
    if (meals.length > 0) {
      for (let i = 1; i < 6; i++) {
        const totalingArray = meals.map(e => {
          let nutrient = e.nutrition.nutrients;
          if (e.doubleCalories) {
            return nutrient[i].amount * 2;
          } else {
            return nutrient[i].amount;
          }
        });

        const nutrientTotal = totalingArray.reduce((acc, cur) => acc + cur);
        totals.push(nutrientTotal);
      }

      setCalories(totals[4]);
      setProtein(totals[0]);
      setFat(totals[1]);
      setCarbs(totals[2]);
      setSugar(totals[3]);
    }
  }, [meals]);

  function deleteMeal(foundId) {
    const deleteMealCalories = meals.filter(meal => {
      if (meal.id === foundId) {
        console.log('Deleted meal');
        return meal;
      }
    });

    runningCalTally =
      target - deleteMealCalories[0].nutrition.nutrients[0].amount;
    // console.log(runningCalTally);

    setMeals(prevVal => {
      return prevVal.filter(meal => {
        return meal.id !== foundId;
      });
    });
    getMeals();
  }

  function findWord(string) {
    const words = string.split(' ');
    // console.log(words);

    for (const word of words) {
      if (KEYWORDS[word]) {
        keywordsSeen.push(word);
      }

      if (DONT_INCLUDE[word]) {
        dontInclude = true;
        rejectionReason =
          'this type of food was already selected by another recipe.';
      }

      if (BAD_API_IDS[word]) {
        rejectionReason =
          'based on recipe ID, this recipe is missing key information.';
      }

      if (DONT_ADD_CALORIES[word]) {
        addCalories = false;
        // console.log(`addCalories: ${addCalories}`);
      }

      if (MUST_ADD_CALORIES[word]) {
        addCalories = true;
        // console.log(`addCalories: ${addCalories}`);
      }
    }
  }

  function findDupes(arr) {
    const observed = {};
    for (let i = 0; i < arr.length; i++) {
      if (observed[arr[i]]) {
        return arr[i];
      } else {
        observed[arr[i]] = arr[i];
      }
    }

    return false;
  }

    function getMeals() {
      let maxCalories = target - runningCalTally;
      const duplicate = findDupes(keywordsSeen);
      const idDuplicate = findDupes(ids);

      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=vegetarian&type=main course,side dish,snack,appetizer,salad,soup,fingerfood&excludeIngredients=white chocolate,vanilla bean paste,semi sweet chocolate chips&fillIngredients=true&instructionsRequired=true&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${props.userCalAverage}&sort=random&number=1`
      )
        .then((response) => response.json())
        .then(data => {
          setMeal(data);
        })
        .catch(() => {
          console.log(`Error: Meal did not generate.`);
        });


      // const fetchedMeal = response.json();
      // dontInclude = false;
      // addCalories = true;
      // findWord(fetchedMeal.results[0].title.toLowerCase()); // Parse title, determine how and whether to adjust calories
      // ids.push(fetchedMeal.results[0].id);
      // console.log(fetchedMeal);
      // if (!duplicate && !idDuplicate && !dontInclude) {
      //   // console.log(idDuplicate);
      //   let newCalTotal = Number(
      //     fetchedMeal.results[0].nutrition.nutrients[0].amount
      //   );
      //   fetchedMeal.results[0].addCalories = true;
      //   fetchedMeal.results[0].doubleCalories = false;
      //   newCalTotal = newCalTotal + 200;

      //   if (target - runningCalTally < 250) {
      //     fetchedMeal.results[0].addCalories = false;
      //     addCalories = false;
      //     newCalTotal = newCalTotal - 200;
      //     // console.log(`addCalories: ${addCalories}`);
      //   } else if (
      //     !addCalories ||
      //     DONT_ADD_CALORIES[fetchedMeal.results[0].id]
      //   ) {
      //     if (newCalTotal <= 250) {
      //       newCalTotal = newCalTotal * 2;
      //       fetchedMeal.results[0].addCalories = true;
      //       fetchedMeal.results[0].doubleCalories = true;
      //       // console.log(`addCalories: ${addCalories}`);
      //     } else {
      //       newCalTotal = newCalTotal - 200;
      //       fetchedMeal.results[0].addCalories = false;
      //       addCalories = false;
      //       // console.log(`addCalories: ${addCalories}`);
      //     }
      //   }
      //   fetchedMeal.results[0].adjustedCal = newCalTotal;
      //   fetchedMeal.results[0].nutrition.nutrients.push({
      //     type: 'Adjusted Calories',
      //     amount: newCalTotal,
      //     unit: 'kcal',
      //   });
      //   runningCalTally = runningCalTally + newCalTotal;
      // } else {
      //   i--;
      // }
  }

  function handleDiet(e) {
    setDiet();
  }

  function handleMeals(e) {
    setNumberOfMeals(e.target.value);
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
          <p>Number of Meals</p>
          <select onChange={handleMeals} className="d-block">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="control">
          <input
            className="d-block"
            type="number"
            placeholder={props.userCalAverage}
            onChange={e => e.target.value}
          />
          <button 
          className="btn-primary"
          onClick={getMeals}>
          Get Daily Meal Plan
          </button>
        </div>
      </section>
      {meals && (
        <MealList
          target={target}
          calories={calories}
          protein={protein}
          fat={fat}
          carbs={carbs}
          sugar={sugar}
          meals={meals}
          deleteMeal={deleteMeal}
        ></MealList>
      )}
    </div>
  );
}

export default MealPlan;
