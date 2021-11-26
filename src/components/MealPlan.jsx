import React, { useState, useEffect } from 'react';
import MealList from './MealList';
import Checkbox from './Checkbox';


function MealPlan(props) {
  const ids = [];
  const totals = [];
  let runningCalTally = 0;
  let target = 1000; // Set this for testing. Typiocally props.userCalAverage;

  const DIETS = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten Free',
    'Ketogenic',
  ];
  const [meal, setMeal] = useState(null);
  const [meals, setMeals] = useState();
  const [diet, setDiet] = useState('');

  function deleteMeal(foundId) {
    const deleteMealCalories = meals.filter(meal => {
      if (meal.id === foundId) {
        console.log('Deleted meal');
        return meal;
      }
    });

    runningCalTally =
      target - deleteMealCalories[0].nutrition.nutrients[0].amount;

    setMeals(prevVal => {
      return prevVal.filter(meal => {
        return meal.id !== foundId;
      });
    });
    getMeals();
  }

    function handleCallback(i) {
      setMeals(prevVal => {
        let results = prevVal.results.splice(i, 1);;
        return results;
      });
    }
        
    function getMeals() {   
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&diet=vegetarian&type=main course,side dish,snack,appetizer,salad,soup,fingerfood&excludeIngredients=white chocolate,vanilla bean paste,semi sweet chocolate chips&fillIngredients=true&instructionsRequired=true&maxReadyTime=30&maxSugar=10&minProtein=1&minCarbs=1&minFat=1&minCalories=1&maxCalories=${props.userCalAverage}&sort=random&number=1`
      )
        .then((response) => response.json())
        .then(data => {

          setMeals(data);
        })
        .catch(() => {
          console.log(`Error`);
        });
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
          <button 
          className="btn-primary"
          onClick={getMeals}>
          Get Daily Meal Plan
          </button>
        </div>
      </section>
      {meals &&
        <MealList meals={meals}
          target={target}
          meals={meals}
          deleteMeal={deleteMeal}
          handleCallback={handleCallback}
        />
      }
    </div>
  );
}

export default MealPlan;
