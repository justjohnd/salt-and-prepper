import React from 'react';
import H2 from './H2';
import Input from './Input';

function FormSecMealPlan() {
  return (
    <div>
      <H2 message="Let's generate your meal plan" />
      <Input
        onChange=""
        name=""
        value=""
        label="Meal Plan Length"
        type="number"
        placeholder="How many days?"
      />
      <Input
        onChange=""
        name=""
        value=""
        label="First Meal"
        type="text"
        placeholder="From"
      />
      <Input
        onChange=""
        name=""
        value=""
        label="Final Meal"
        type="text"
        placeholder="To"
      />
    </div>
  );
}

export default FormSecMealPlan;
