import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Meal(props) {
  // const [recipeData, setRecipeData] = useState(null);
  // const [showInstructions, setShowInstructions] = useState(false);
  // const [showInstructionsButton, setShowInstructionsButton] = useState(
  //   'Show Instructions'
  // );

  // useEffect(() => {
  //   getMealInformation().catch(() => {
  //     console.log('error');
  //   });

  //   async function getMealInformation() {
  //     const response = await fetch(
  //       `https://api.spoonacular.com/recipes/${props.meal.id}/information?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&includeNutrition=false`
  //     );
  //     const data = await response.json();
  //     // console.log(data);
  //     if (
  //       data.analyzedInstructions[0].steps.length === 1 ||
  //       data.analyzedInstructions === []
  //     ) {
  //       console.log(
  //         `Note: recipe with ${props.meal.id} has been removed because it does not contain recipe instructions`
  //       );
  //       props.deleteMeal(props.meal.id);
  //     } else {
  //       setRecipeData(data);
  //     }
  //   }
  // }, [props.meal.id]);

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

  const [calories, protein, fat, carbohydrates, sugar] = props.meal.nutrition;

  return (
    <div className="recipe">
      {props.meal && (
        <div>
          <h2 className="title">{props.meal.title}</h2>
          <img src={props.meal.image} alt="recipe" />
          <ul className="instructions">
            <li>
              <strong>Calories: </strong>
              {calories.toFixed(0)}
            </li>
            <li>
              <strong>Protein: </strong>
              {protein.toFixed(0)}
            </li>
            <li>
              <strong>Carbohydrates: </strong>
              {carbohydrates.toFixed(0)}
            </li>
            <li>
              <strong>Fat: </strong>
              {fat.toFixed(0)}
            </li>
            <li>
              <strong>Sugar: </strong>
              {sugar.toFixed(0)}
            </li>
            <li>
              <strong>
                {props.meal.addCalories && 'Calories were added to this meal'}
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

          {/* <button>
            <a
              href={recipeData.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Recipe
            </a>
          </button> */}
        </div>
      )}
    </div>
  );
}
