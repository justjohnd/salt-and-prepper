import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Instructions(props) {
  const recipe = props.recipes.find(e => e.id === props.meal.id);
  console.log(recipe);
  const instructions = recipe.analyzedInstructions[0].steps;
  console.log(instructions);

  return (
    <div>
      <ul className="instructions">
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
