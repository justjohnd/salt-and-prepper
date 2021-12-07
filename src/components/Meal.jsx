import React, { useState } from 'react';
import Ingredients from "./Ingredients";
import Instructions from './Instructions';

export default function Meal(props) {
  const [instructionsDisplay, setInstructionsDisplay] = useState(false);
    const [ingredientsDisplay, setIngredientsDisplay] = useState(false);


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

   function handleInstructions() {
     setInstructionsDisplay(prevValue => {
       return !prevValue;
     });
   }

   function handleIngredients() {
       setIngredientsDisplay(prevValue => {
         return !prevValue;
       });
   }

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

          <button onClick={handleIngredients}>
            {!ingredientsDisplay ? 'Show Ingredients' : 'Hide Ingredients'}
          </button>
          <section className="ingredients-section">
            {ingredientsDisplay && <Ingredients meal={props.meal} />}
          </section>

          <button onClick={handleInstructions}>
            {!instructionsDisplay ? 'Show Instructions' : 'Hide Instructions'}
          </button>
          <section className="ingredients-section">
            {instructionsDisplay && <Instructions meal={props.meal} />}
          </section>

        </div>
      )}
    </div>
  );
}
