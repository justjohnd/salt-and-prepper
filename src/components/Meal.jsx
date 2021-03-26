import React, { useState, useEffect } from 'react';

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState('');
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=627d3d5f6ac5413fb693db5fb5a4d394&includeNutrition=false`
    )
      .then(response => response.json())
      .then(data => {
        // setImageUrl(data.image);
        setRecipeData(data);
      })
      .catch(() => {
        console.log('error');
      });
  }, [meal.id]);

  let calories = meal.nutrition.nutrients[0].amount.toFixed(0);
  return (
    <article>
      {recipeData && (
        <div>
          <h1>{meal.title}</h1>
          <img src={recipeData.image} alt="recipe" />
          <ul className="instructions">
            {/* Note: servings and calories are adjusted for small size dishes */}
            <li> Preparation time: {recipeData.readyInMinutes} minutes</li>
            <li>
              Number of servings:
              {calories <= 300 ? recipeData.servings / 2 : recipeData.servings}
            </li>
            <li> Calories: {calories <= 300 ? calories * 2 : calories} </li>
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
    </article>
  );
}
