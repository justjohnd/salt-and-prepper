import React from 'react';
import Ingredients from "./Ingredients";
import Instructions from './Instructions';

export default function Meal(props) {
  // Use to remove items with no instructions

// if (
  //         data.analyzedInstructions[0].steps.length === 1 ||
  //         data.analyzedInstructions === []
  //       ) {
  //         console.log(
  //           `Note: recipe with ${props.meal.id} has been removed because it does not contain recipe instructions`
  //         );
  //         props.deleteMeal(props.meal.id);
  //       } else {

  return (
    <div className="recipe">
      {props.meal && (
        <div>
          <h2 className="title">{props.meal.title}</h2>
          <img src={props.meal.image} alt="recipe" />
          <ul className="instructions">
            <li>
              <strong>Calories: </strong>
              {props.calories}
            </li>
            <li>
              <strong>Protein: </strong>
              {props.protein}
            </li>
            <li>
              <strong>Carbohydrates: </strong>
              {props.carbohydrates}
            </li>
            <li>
              <strong>Fat: </strong>
              {props.fat}
            </li>
            <li>
              <strong>Sugar: </strong>
              {props.sugar}
            </li>
            <li>
              <strong>
                {props.addCalories && 'Calories were added to this meal'}
              </strong>
            </li>
          </ul>

          <button onClick={() => props.handleIngredientsCallback()}>
            {!props.ingredientsDisplay ? 'Show Ingredients' : 'Hide Ingredients'}
          </button>
          <section className="ingredients-section">
            {props.ingredientsDisplay && <Ingredients meal={props.meal} />}
          </section>

          <button onClick={() => props.handleInstructionsCallback()}>
            {!props.instructionsDisplay ? 'Show Instructions' : 'Hide Instructions'}
          </button>
          <section className="ingredients-section">
            {props.instructionsDisplay && <Instructions meal={props.meal} />}
          </section>

        </div>
      )}
    </div>
  );
}
