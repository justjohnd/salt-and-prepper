import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Meal(props) {

    const [instructions, setInstructions] = useState([]);
        useEffect(() => {
          fetch(
            `https://api.spoonacular.com/recipes/${props.meal.id}/analyzedInstructions?apiKey=627d3d5f6ac5413fb693db5fb5a4d394`
          )
            .then(response => response.json())
            .then(data => {
              setInstructions(data);
            })
            .catch(() => {
              console.log('error');
            });
        }, [props.meal.id]);

        return (
          <ul className="instructions">
            {instructions.step.map(e => {
              return <li key={uuidv4()}>{e.step}</li>;
            })}
          </ul>
        );
      }


