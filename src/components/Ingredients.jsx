import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Ingredients(props) {
    const ingredients = props.meal.missedIngredients;
    console.log(ingredients);

        return (
          <div>
            {/* <ul className="ingredients">
              {ingredients.map((ingredient) => {
                return <li key={uuidv4()}>{ingredient.name} {ingredient.amount} {ingredient.unitShort}</li>;
              })}
            </ul> */}
          </div>
        );
      }


