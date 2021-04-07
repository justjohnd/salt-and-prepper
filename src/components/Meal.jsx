import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Meal(props) {
  const [recipeData, setRecipeData] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showInstructionsButton, setShowInstructionsButton] = useState(
    'Show Instructions'
  );

  useEffect(() => {
    getMealInformation().catch(() => {
      console.log('error');
    });

    async function getMealInformation() {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${props.meal.id}/information?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&includeNutrition=false`
      );
      const data = await response.json();
      console.log(data);
      if (data.analyzedInstructions[0].steps.length === 1) {
        console.log(
          `Note: recipe with ${props.meal.id} has been removed because it does not contain recipe instructions`
        );
        props.deleteMeal(props.meal.id);
      } else {
        setRecipeData(data);
      }
    }
  }, [props.meal.id]);

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
      {recipeData && (
        <div>
          <h2 className="title">{props.meal.title}</h2>
          <img src={recipeData.image} alt="recipe" />
          <ul className="instructions">
            <li>
              <strong>Preparation time: </strong> {recipeData.readyInMinutes}{' '}
              minutes
            </li>
            <li>
              <strong>Number of servings: </strong>
              {recipeData.servings}
            </li>
            <li>
              <strong>Calories: </strong>
              {props.meal.adjustedCal.toFixed(0)}
            </li>
            <li>
              <strong>
                {props.meal.addCalories && 'Calories were added to this meal'}
              </strong>
            </li>
          </ul>

          <button onClick={getInstructions}>{showInstructionsButton}</button>
          {showInstructions && (
            <ul className="instructions">
              {recipeData.analyzedInstructions[0].steps.map(e => {
                return <li key={uuidv4()}>{e.step}</li>;
              })}
            </ul>
          )}

          <button>
            <a
              href={recipeData.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Recipe
            </a>
          </button>
        </div>
      )}
    </div>
  );
}
