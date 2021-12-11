import React from 'react';
import Meal from './Meal';

function MealList(props) {

  return (
    <main>
      <section className="nutrients">
        {<h1>{props.message}</h1>}
      </section>

      <section className="meals">
        {props.meals.map((meal, index) => {
          const [calories, protein, fat, carbohydrates, sugar] =
            meal.nutrition.nutrients;

          return (
            <Meal
              index={index}
              recipes={props.recipes}
              key={meal.id}
              ingredientsDisplay={props.ingredientsDisplay}
              instructionsDisplay={props.instructionsDisplay}
              handleInstructionsCallback={props.handleInstructionsCallback}
              handleIngredientsCallback={props.handleIngredientsCallback}
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
