import React, { useState } from 'react';
import Input from './Input';
import Family from './Family';
import family, { addFamilyMember } from '../family';

function Form() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [calories, setCalories] = useState('');

  function handleName(event) {
    setName(event.target.value);
  }

  function handleBirthday(event) {
    setBirthday(event.target.value);
  }

  function handleGender(event) {
    setGender(event.target.value);
  }

  function handleCalories(event) {
    setCalories(event.target.value);
  }

  function handleSubmit(event) {
    setMessage('Thanks for filling out the form!');
    setSubmitted(true);
    addFamilyMember(name, birthday, gender, calories);
    console.log(family);
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <Input
          onChange={handleName}
          value={name}
          label="Name"
          type="text"
          placeholder="Your Name"
        />
        <Input
          onChange={handleBirthday}
          value={birthday}
          label="Birthday"
          type="date"
          placeholder=""
        />
        <Input
          onChange={handleGender}
          value={gender}
          label="Gender"
          type="text"
          placeholder="Gender"
        />
        <Input
          onChange={handleCalories}
          value={calories}
          label="Daily Caloric Requirement"
          type="number"
          placeholder="Calorie Target"
        />
        <button type="submit">Submit</button>
        <h1>{message}</h1>
      </form>
      <Family submitted={submitted} />
    </div>
  );
}

export default Form;
