import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Ingredients(props) {

    const recipe = props.recipes.find(e => e.id === props.meal.id);
    const ingredients = recipe.extendedIngredients;

        return (
          <div>
            <ul className="ingredients">
              {ingredients.map((ingredient) => {
                return (
                  <li key={uuidv4()}>
                    <div>{ingredient.name}</div>
                    <div>{ingredient.amount} {ingredient.unit}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }


