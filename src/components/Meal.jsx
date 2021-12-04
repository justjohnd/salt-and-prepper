import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Ingredients from "./Ingredients";
import Instructions from './Instructions';

export default function Meal(props) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showInstructionsButton, setShowInstructionsButton] = useState(
    'Show Instructions'
  );
    const [showIngredients, setShowIngredients] = useState(false);
    const [showIngredientsButton, setShowIngredientsButton] =
      useState('Show Ingredients');

  const [areIngredients, setAreIngredients] = useState(false);

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

  function getInstructions() {
    setShowInstructions(prevValue => {
      return !prevValue;
    });

    if (getInstructions) {
      setShowInstructionsButton('Hide Instructions');
    } else {
      setShowInstructionsButton('Show Instructions');
    }
  }

   function getIngredients() {
     setShowIngredients(prevValue => {
       return !prevValue;
     });

     if (getIngredients) {
       setShowIngredientsButton('Hide Ingredients');
     } else {
       setShowIngredientsButton('Show Ingredients');
     }
   }

   function handleCallback() {
     setAreIngredients(true);
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

          <button onClick={getIngredients}>{showIngredientsButton}</button>
          {showIngredients && <Ingredients 
          handleCallback={ () => handleCallback() }
          meal={props.meal} />}

          <button onClick={getInstructions}>{showInstructionsButton}</button>
          {showInstructions && <Instructions meal={props.meal} />}
        </div>
      )}
    </div>
  );
}
