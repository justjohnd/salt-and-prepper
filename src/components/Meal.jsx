import React, { useState } from 'react';
import Ingredients from "./Ingredients";
import Instructions from './Instructions';

export default function Meal(props) { 
  const recipe = props.recipes.find(e => e.id === props.meal.id);
  console.log(recipe);
  const summary = recipe.summary;
  console.log(summary);

  //Create a short summary that doesn't cut off on an html attribute
  const summaryArray = summary.split(' ');
  const sliceArray = summaryArray.slice(0, 100);
  const shortSummary = sliceArray.join(' ');

  const [showSummary, setShowSummary] = useState('false');

  
  function handleSummary() {
    setShowSummary(!showSummary);
  }

  function createMarkup(markup) {
    return { __html: markup };
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
              <ul className="nutrition">
                <li>
                  <strong>Calories: </strong>
                  {props.calories}
                </li>
                <li>
                  <strong>Protein: </strong>
                  {props.protein} g
                </li>
                <li>
                  <strong>Carbohydrates: </strong>
                  {props.carbohydrates} g
                </li>
                <li>
                  <strong>Fat: </strong>
                  {props.fat} g
                </li>
                <li>
                  <strong>Sugar: </strong>
                  {props.sugar} g
                </li>
                <li>
                  <strong>
                    {props.addCalories && 'Calories were added to this meal'}
                  </strong>
                </li>
              </ul>
            </div>
            <section className="summary">
              {showSummary ? (
                <p dangerouslySetInnerHTML={createMarkup(shortSummary)}></p>
              ) : (
                <p dangerouslySetInnerHTML={createMarkup(summary)}></p>
              )}
              ...
              <button className="text-link" onClick={handleSummary}>
                {showSummary ? 'Read More' : 'Read Less'}
              </button>
            </section>

            <button
              className="btn-primary"
              onClick={() => props.handleIngredientsCallback(props.index)}
            >
              {!props.ingredientsDisplay[props.index]
                ? 'Show Ingredients'
                : 'Hide Ingredients'}
            </button>
            <section className="recipe-contents-wrapper">
              {props.ingredientsDisplay[props.index] && (
                <Ingredients recipes={props.recipes} meal={props.meal} />
              )}
            </section>

            <button
              className="btn-primary instructions-btn"
              onClick={() => props.handleInstructionsCallback(props.index)}
            >
              {!props.instructionsDisplay[props.index]
                ? 'Show Instructions'
                : 'Hide Instructions'}
            </button>
            <section className="recipe-contents-wrapper">
              {props.instructionsDisplay[props.index] && (
                <Instructions recipes={props.recipes} meal={props.meal} />
              )}
            </section>
          </div>
        )}
      </div>
    );
}
