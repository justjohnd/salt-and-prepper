import React, { useState, useEffect } from 'react';
import MealList from './MealList';
import Checkbox from './Checkbox';
import KEYWORDS, { DONT_INCLUDE, ADD_CALORIES } from '../findWord';

function MealPlan(props) {
  const keywordsSeen = [];
  const ids = [];
  const totals = [];
  let dontInclude = false;
  let addCalories = false;
  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [calorieTarget, setCalorieTarget] = useState(props.userCalAverage);
  const [diet, setDiet] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [sugar, setSugar] = useState(0);

  useEffect(() => {
    if (meal) {
      setMeals([...meals, meal]);
      console.log(meals);
    }
  }, [meal]);

  useEffect(() => {
    if (meals.length > 0) {
      for (let i = 0; i < 5; i++) {
        const totalingArray = meals.map(e => {
          if (e.results[0].addCalories) {
            return e.results[0].nutrition.nutrients[i].amount + 200;
          } else if (e.results[0].doubleCalories) {
            return e.results[0].nutrition.nutrients[i].amount * 2;
          } else {
            return e.results[0].nutrition.nutrients[i].amount;
          }
        });

        const nutrientTotal = totalingArray.reduce((acc, cur) => acc + cur);
        totals.push(nutrientTotal);
      }

      setCalories(totals[0]);
      setProtein(totals[1]);
      setFat(totals[2]);
      setCarbs(totals[3]);
      setSugar(totals[4]);
    }
  }, [meals]);

  function findWord(string) {
    const words = string.split(' ');

    for (const word of words) {
      if (KEYWORDS[word]) {
        keywordsSeen.push(word);
      }

      if (DONT_INCLUDE[word]) {
        dontInclude = true;
      }

      if (ADD_CALORIES[word]) {
        addCalories = true;
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
    let totalCalories = 0;
    let target = 500; //props.userCalAverage;

    while (totalCalories < target && i < 2) {
      await getMeal().catch(() => {
        console.log('error');
        i++;
      });
    }

    async function getMeal() {
      let maxCalories = target;
      const duplicate = findDupes(keywordsSeen);
      const idDuplicate = findDupes(ids);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&instructionsRequired=true&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${maxCalories}&sort=random&number=1`
      );
      const meal = await response.json();
      findWord(meal.results[0].title.toLowerCase()); // Parse title
      ids.push(meal.results[0].id);
      if (!duplicate && !idDuplicate && !dontInclude) {
        console.log(
          `original calories: ${meal.results[0].nutrition.nutrients[0].amount}`
        );
        if (addCalories) {
          totalCalories =
            totalCalories +
            Number(meal.results[0].nutrition.nutrients[0].amount) +
            200;
          meal.results[0].addCalories = true;
          meal.results[0].doubleCalories = false;
        } else if (
          Number(meal.results[0].nutrition.nutrients[0].amount) <= 250
        ) {
          totalCalories =
            totalCalories +
            Number(meal.results[0].nutrition.nutrients[0].amount) * 2;
          meal.results[0].addCalories = false;
          meal.results[0].doubleCalories = true;
        } else {
          totalCalories =
            totalCalories +
            Number(meal.results[0].nutrition.nutrients[0].amount);
          meal.results[0].addCalories = false;
          meal.results[0].doubleCalories = false;
        }
        return setMeal(meal);
      } else {
        console.log(
          `Fetched ${meal.results[0].title.toLowerCase()} discarded because either ID was repeated, it was found on the "DON'T INCLUDE" list, or it was too similar to a previous fetch`
        );
      }
    }
  }

  //     .then(() => {
  //       if (totalCalories <= target) {
  //         if (totalCalories < target - 250 && totalCalories < target - 50) {
  //           maxCalories = target - totalCalories + 50;
  //         } else {
  //           maxCalories = 250;
  //         }
  //         return fetch(
  //           `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${maxCalories}&sort=random&number=1`
  //         )
  //           .then(response => response.json())
  //           .then(data => {
  //             // console.log(findDupes(keywordsSeen));
  //             totalCalories =
  //               totalCalories +
  //               Number(data.results[0].nutrition.nutrients[0].amount);
  //             setMeal(data);
  //             findWord(data.results[0].title.toLowerCase());
  //           })
  //           .catch(() => {
  //             console.log('error');
  //           });
  //       } else {
  //         console.log(
  //           `total exceeds target or ${target}, currently at ${totalCalories}`
  //         );
  //       }
  //     })

  //     .then(() => {
  //       if (totalCalories <= target) {
  //         if (totalCalories < target - 250 && totalCalories < target - 50) {
  //           maxCalories = target - totalCalories + 50;
  //         } else {
  //           maxCalories = 250;
  //         }
  //         return fetch(
  //           `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${maxCalories}&sort=random&number=1`
  //         )
  //           .then(response => response.json())
  //           .then(data => {
  //             // console.log(`keywords already seen: ${findDupes(keywordsSeen)}`);
  //             totalCalories =
  //               totalCalories +
  //               Number(data.results[0].nutrition.nutrients[0].amount);
  //             setMeal(data);
  //             findWord(data.results[0].title.toLowerCase());
  //           })
  //           .catch(() => {
  //             console.log('error');
  //           });
  //       } else {
  //         console.log(`total exceeds target, currently at ${totalCalories}`);
  //       }
  //     })

  //     .then(() => {
  //       if (totalCalories <= target) {
  //         if (totalCalories < target - 250 && totalCalories < target - 50) {
  //           maxCalories = target - totalCalories + 50;
  //         } else {
  //           maxCalories = 250;
  //         }
  //         return fetch(
  //           `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${maxCalories}&sort=random&number=1`
  //         )
  //           .then(response => response.json())
  //           .then(data => {
  //             // console.log(`keywords already seen: ${findDupes(keywordsSeen)}`);
  //             totalCalories =
  //               totalCalories +
  //               Number(data.results[0].nutrition.nutrients[0].amount);
  //             setMeal(data);
  //             findWord(data.results[0].title.toLowerCase());
  //           })
  //           .catch(() => {
  //             console.log('error');
  //           });
  //       } else {
  //         console.log(`total exceeds target, currently at ${totalCalories}`);
  //       }
  //     })

  //     .then(() => {
  //       if (totalCalories <= target) {
  //         if (totalCalories < target - 250 && totalCalories < target - 50) {
  //           maxCalories = target - totalCalories + 50;
  //         } else {
  //           maxCalories = 250;
  //         }
  //         return fetch(
  //           `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${maxCalories}&sort=random&number=1`
  //         )
  //           .then(response => response.json())
  //           .then(data => {
  //             // console.log(`keywords already seen: ${findDupes(keywordsSeen)}`);
  //             totalCalories =
  //               totalCalories +
  //               Number(data.results[0].nutrition.nutrients[0].amount);
  //             setMeal(data);
  //             findWord(data.results[0].title.toLowerCase());
  //           })
  //           .catch(() => {
  //             console.log('error');
  //           });
  //       } else {
  //         console.log(`total exceeds target, currently at ${totalCalories}`);
  //       }
  //     })

  //     .then(() => {
  //       if (totalCalories <= target) {
  //         if (totalCalories < target - 250 && totalCalories < target - 50) {
  //           maxCalories = target - totalCalories + 50;
  //         } else {
  //           maxCalories = 250;
  //         }
  //         return fetch(
  //           `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=${diet}&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${maxCalories}&sort=random&number=1`
  //         )
  //           .then(response => response.json())
  //           .then(data => {
  //             // console.log(`keywords already seen: ${findDupes(keywordsSeen)}`);
  //             totalCalories =
  //               totalCalories +
  //               Number(data.results[0].nutrition.nutrients[0].amount);
  //             setMeal(data);
  //             findWord(data.results[0].title.toLowerCase());
  //           })
  //           .catch(() => {
  //             console.log('error');
  //           });
  //       } else {
  //         console.log(`total exceeds target, currently at ${totalCalories}`);
  //       }
  //     });
  // }

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
      {meals.length > 0 && (
        <MealList
          calories={calories}
          protein={protein}
          fat={fat}
          carbs={carbs}
          sugar={sugar}
          meals={meals}
        />
      )}
      {meal && (
        <ul>
          {keywordsSeen.map((keyword, index) => {
            return <li key={index}>{keyword}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default MealPlan;
