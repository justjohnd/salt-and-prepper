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
  let target = props.userCalAverage;
  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [getMealsComplete, setGetMealsComplete] = useState(false);
  const [diet, setDiet] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [sugar, setSugar] = useState(0);

  useEffect(() => {
    if (meal) {
      setMeals([...meals, meal]);
    }
  }, [meal]);

  useEffect(() => {
    //This is for totals
    if (meals.length > 0) {
      for (let i = 1; i < 5; i++) {
        const totalingArray = meals.map(e => {
          if (e.results[0].doubleCalories) {
            return e.results[0].nutrition.nutrients[i].amount * 2;
          } else {
            return e.results[0].nutrition.nutrients[i].amount;
          }
        });

        const nutrientTotal = totalingArray.reduce((acc, cur) => acc + cur);
        totals.push(nutrientTotal);
      }

      const calTotalArray = meals.map(e => e.results[0].adjustedCal);
      const calTotal = calTotalArray.reduce((acc, cur) => acc + cur);
      totals.unshift(calTotal);

      setCalories(totals[0]);
      setProtein(totals[1]);
      setFat(totals[2]);
      setCarbs(totals[3]);
      setSugar(totals[4]);
    }
  }, [meals]);

  function deleteMeal(foundId) {
    const deleteMealCalories = meals.filter(meal => {
      if (meal.results[0].id === foundId) {
        return meal;
      }
    });

    runningCalTally =
      target - deleteMealCalories[0].results[0].nutrition.nutrients[0].amount;
    // console.log(runningCalTally);

    setMeals(prevVal => {
      return prevVal.filter(meal => {
        return meal.results[0].id !== foundId;
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

      if (DONT_INCLUDE[word] || BAD_API_IDS[word]) {
        dontInclude = true;
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

  async function getMeals() {
    let i = 0;

    while (runningCalTally < target && i < 3) {
      await getMeal().catch(() => {
        console.log('error');
      });
      i++;
      console.log(i);
    }

    setGetMealsComplete(true);

    async function getMeal() {
      let maxCalories = target - runningCalTally;
      const duplicate = findDupes(keywordsSeen);
      const idDuplicate = findDupes(ids);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&type=main course,side dish,snack,appetizer,salad,soup,fingerfood&excludeIngredients=white chocolate,vanilla bean paste,semi sweet chocolate chips&fillIngredients=true&instructionsRequired=true&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${maxCalories}&sort=random&number=1`
      );
      const meal = await response.json();
      dontInclude = false;
      addCalories = true;
      findWord(meal.results[0].title.toLowerCase()); // Parse title, determine how and whether to adjust calories
      ids.push(meal.results[0].id);
      if (!duplicate && !idDuplicate && !dontInclude) {
        console.log(idDuplicate);
        let newCalTotal = Number(meal.results[0].nutrition.nutrients[0].amount);
        meal.results[0].addCalories = true;
        meal.results[0].doubleCalories = false;
        newCalTotal = newCalTotal + 200;

        if (target - runningCalTally < 250) {
          meal.results[0].addCalories = false;
          addCalories = false;
          newCalTotal = newCalTotal - 200;
          // console.log(`addCalories: ${addCalories}`);
        } else if (!addCalories || DONT_ADD_CALORIES[meal.results[0].id]) {
          if (newCalTotal <= 250) {
            newCalTotal = newCalTotal * 2;
            meal.results[0].addCalories = true;
            meal.results[0].doubleCalories = true;
            // console.log(`addCalories: ${addCalories}`);
          } else {
            newCalTotal = newCalTotal - 200;
            meal.results[0].addCalories = false;
            addCalories = false;
            // console.log(`addCalories: ${addCalories}`);
          }
        }
        meal.results[0].adjustedCal = newCalTotal;
        runningCalTally = runningCalTally + newCalTotal;
        // console.log(meal.results[0]);
        // console.log(`Running Calorie Tally: ${runningCalTally}`);
        return setMeal(meal);
      } else {
        console.log(meal.results[0]);
        console.log(
          `Fetched ${meal.results[0].title.toLowerCase()} discarded because either ID was repeated, it was found on the "DON'T INCLUDE" list, or it was too similar to a previous fetch`
        );
      }
    }
  }

  function handleDiet(e) {
    setDiet();
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
          <input
            className="d-block"
            type="number"
            placeholder={props.userCalAverage}
            onChange={e => e.target.value}
          />
          <button onClick={getMeals}>Get Daily Meal Plan</button>
        </div>
      </section>
      {getMealsComplete && (
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
