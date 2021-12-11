import React, { useState } from 'react';
import Ingredients from "./Ingredients";
import Instructions from './Instructions';

export default function Meal(props) { 
  const recipe = props.recipes.find(e => e.id === props.meal.id);
  const summary = recipe.summary;
  const shortSummary = summary.slice(0, 300);

  const [showSummary, setShowSummary] = useState('false');

  
  function handleSummary() {
    setShowSummary(!showSummary);
  }
  
    return (
    <div className="recipe">
      {props.meal && (
        <div>
          <div className="container-title">
            <h2 className="title">{props.meal.title}</h2>
          </div>
          <div className="img-and-nutrition">
            <img src={props.meal.image} alt="recipe" />
            <ul className="instructions">
              <li>
                <strong>Calories: </strong>
                {props.calories}
              </li>
              <li>
                <strong>Protein: </strong>
                {props.protein}
              </li>
              <li>
                <strong>Carbohydrates: </strong>
                {props.carbohydrates}
              </li>
              <li>
                <strong>Fat: </strong>
                {props.fat}
              </li>
              <li>
                <strong>Sugar: </strong>
                {props.sugar}
              </li>
              <li>
                <strong>
                  {props.addCalories && 'Calories were added to this meal'}
                </strong>
              </li>
            </ul>
          </div>
          <section className="summary">
            <p>{showSummary ? shortSummary : summary}...<button className="text-link" onClick={handleSummary}>{showSummary ? 'Read More' : 'Read Less'}</button></p>
          </section>

          <button
            className="btn-primary"
            onClick={() => props.handleIngredientsCallback(props.index)}
          >
            {!props.ingredientsDisplay[props.index]
              ? 'Show Ingredients'
              : 'Hide Ingredients'}
          </button>
          <section className="ingredients-section">
            {props.ingredientsDisplay[props.index] && (
              <Ingredients recipes={props.recipes} meal={props.meal} />
            )}
          </section>

          <button
            className="btn-primary"
            onClick={() => props.handleInstructionsCallback(props.index)}
          >
            {!props.instructionsDisplay[props.index]
              ? 'Show Instructions'
              : 'Hide Instructions'}
          </button>
          <section className="ingredients-section">
            {props.instructionsDisplay[props.index] && (
              <Instructions recipes={props.recipes} meal={props.meal} />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
