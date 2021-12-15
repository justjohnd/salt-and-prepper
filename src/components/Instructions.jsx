import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Instructions(props) {
  const recipe = props.recipes.find(e => e.id === props.meal.id);
  const instructions = recipe.analyzedInstructions[0].steps;
  

  return (
    <div>
      <ul className="recipe-contents align-left">
        {instructions.map(instruction => {
          return (
            <li key={uuidv4()}>
              {instruction.number} {instruction.step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
