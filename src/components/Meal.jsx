import React, { useState, useEffect } from 'react';

export default function Meal(props) {
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    getMealInformation().catch(() => {
      console.log('error');
    });
  }, [props.meal.id]);

  async function getMealInformation() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${props.meal.id}/information?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&includeNutrition=false`
    );
    const data = await response.json();
    if (data.analyzedInstructions[0].steps.length === 1) {
      props.deleteMeal(props.meal.id);
    } else {
      setRecipeData(data);
    }
  }

  let calories = props.meal.nutrition.nutrients[0].amount.toFixed(0);
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
              {/* {calories <= 300 ? recipeData.servings / 2 : recipeData.servings} */}
              {recipeData.servings}
            </li>
            <li>
              Calories:
              {/* {calories <= 300 ? calories * 2 : calories} */}
              {calories}
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
