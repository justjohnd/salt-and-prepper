import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Instructions(props) {
  // const ingredients = props.meal.missedIngredients;

  return (
    <div>
      <ul className="instructions">
        {/* {ingredients.map(ingredient => {
          return (
            <li key={uuidv4()}>
              {ingredient.name} {ingredient.amount} {ingredient.unitShort}
            </li>
          );
        })} */}
      </ul>
    </div>
  );
}
