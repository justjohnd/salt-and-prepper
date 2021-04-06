import React, { useState, useEffect } from 'react';

export default function Meal(props) {
  const [recipeData, setRecipeData] = useState(null);

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

  return (
    <div>
      {recipeData && (
        <div>
          <h1>{props.meal.title}</h1>
          <img src={recipeData.image} alt="recipe" />
          <ul className="instructions">
            {/* Note: servings and calories are adjusted for small size dishes */}
            <li> Preparation time: {recipeData.readyInMinutes} minutes</li>
            <li>
              Number of servings:
              {recipeData.servings}
            </li>
            <li>
              Calories:
              {props.meal.adjustedCal.toFixed(0)}
            </li>
            <li>
              {props.meal.addCalories && 'Calories were added to this meal'}
            </li>
          </ul>

          <a
            href={recipeData.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Recipe
          </a>
        </div>
      )}
    </div>
  );
}
