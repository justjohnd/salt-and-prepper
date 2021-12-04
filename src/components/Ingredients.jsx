import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Meal(props) {
    const [ingredients, setIngredients] = useState([]);

        useEffect(() => {
          fetch(
            `https://api.spoonacular.com/recipes/${props.meal.id}/ingredientWidget.json?apiKey=627d3d5f6ac5413fb693db5fb5a4d394`
          )
            .then(response => response.json())
            .then(data => {
              setIngredients(data.ingredients);
              props.handleCallback();
            })
            .catch(() => {
              console.log('error');
            });
        }, [props.meal.id]);

        return (
          <div>
            <ul className="ingredients">
              {ingredients.map((ingredient) => {
                return <li key={uuidv4()}>{ingredient.name}</li>;
              })}
            </ul>
          </div>
        );
      }


