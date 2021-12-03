import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Meal(props) {
  const [recipeData, setRecipeData] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showInstructionsButton, setShowInstructionsButton] = useState(
    'Show Instructions'
  );

  // useEffect(() => {

  //   fetch(
  //     `https://api.spoonacular.com/recipes/${props.meal.id}/information?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&includeNutrition=false`
  //   )
  //     .then(response => response.json())
  //     .then(data => {
  //       if (
  //         data.analyzedInstructions[0].steps.length === 1 ||
  //         data.analyzedInstructions === []
  //       ) {
  //         console.log(
  //           `Note: recipe with ${props.meal.id} has been removed because it does not contain recipe instructions`
  //         );
  //         props.deleteMeal(props.meal.id);
  //       } else {
  //         setRecipeData(data);
  //       }
  //     })
  //     .catch(() => {
  //       console.log(`Error`);
  //     });
  // }, [props.meal.id]);

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

          {/* <button onClick={getInstructions}>{showInstructionsButton}</button>
          {showInstructions && (
            <ul className="instructions">
              {recipeData.analyzedInstructions[0].steps.map(e => {
                return <li key={uuidv4()}>{e.step}</li>;
              })}
            </ul>
          )} */}
        </div>
      )}
    </div>
  );
}
