import React, { useState } from 'react';
import Input from './Input';

function Form() {
  const [submitted, setSubmit] = useState('');

  function handleSubmit(event) {
    setSubmit('Thanks for filling out the form!');
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <Input label="Name" type="text" placeholder="Your Name" />
      <Input label="Birthday" type="date" placeholder="" />
      <Input label="Gender" type="text" placeholder="Gender" />
      <Input
        label="Daily Caloric Requirement"
        type="number"
        placeholder="Calorie Target"
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <h1>{submitted}</h1>
    </form>
  );
}

export default Form;
