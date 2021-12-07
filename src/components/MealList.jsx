import React from 'react';
import Meal from './Meal';

function MealList(props) {

  return (
    <main>
      <section className="nutrients">
        {props.meals[0] === undefined && <h1>Sorry, no results matched criteria</h1>}
      </section>

      <section className="meals">
        {props.meals.map(meal => {
          const [calories, protein, fat, carbohydrates, sugar] =
            meal.nutrition.nutrients;

          return (
            <Meal
              key={meal.id}
              deleteMeal={props.deleteMeal}
              meal={meal}
              calories={calories.amount.toFixed(0)}
              protein={protein.amount.toFixed(0)}
              fat={fat.amount.toFixed(0)}
              carbohydrates={carbohydrates.amount.toFixed(0)}
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
