import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Ingredients from "./Ingredients";
import Instructions from './Instructions';

export default function Meal(props) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showInstructionsButton, setShowInstructionsButton] = useState('Show Instructions'
  );
    const [ingredientsClickCount, setIngredientsClickCount] = useState(0);
    const [ingredientsDisplay, setIngredientsDisplay] = useState('d-none');
    const [ingredientsButton, setIngredientsButton] =
      useState('Show Ingredients');

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

  // function getInstructions() {
  //   setShowInstructions(prevValue => {
  //     return !prevValue;
  //   });

  //   if (getInstructions) {
  //     setShowInstructionsButton('Hide Instructions');
  //   } else {
  //     setShowInstructionsButton('Show Instructions');
  //   }
  // }

   function handleIngredients() {

    setIngredientsClickCount(prevVal => prevVal + 1);

    const curVal = ingredientsDisplay;
    if (curVal === 'd-block') {
      setIngredientsDisplay('d-none');
      setIngredientsButton('Show Ingredients');

    } else {
      setIngredientsDisplay('d-block');
      setIngredientsButton('Hide Ingredients');
    }
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

          <button onClick={handleIngredients}>{ingredientsButton}</button>
          <section className={ingredientsDisplay}>
          {ingredientsClickCount === 1 && (
            <Ingredients
              meal={props.meal}
            />
          )}
          </section>

          {/* <button onClick={getInstructions}>{showInstructionsButton}</button>
          {showInstructions && <Instructions meal={props.meal} />} */}
        </div>
      )}
    </div>
  );
}
