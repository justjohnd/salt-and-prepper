import React, { useState, useEffect } from 'react';
import Input from './Input';
import Family from './Family';
import { addFamilyMember } from '../family';

function Form() {
  const [message, setMessage] = useState(
    'Please let us know a little information in order to calculate your daily nutritional needs'
  );
  const [submitted, setSubmitted] = useState(false);
  const [memberData, setMemberData] = useState({
    fullName: '',
    age: '',
    gender: '',
    calTarget: '',
  });
  const DEFAULT_STATE = {
    fullName: '',
    age: '',
    gender: '',
    calTarget: '',
  };

  function handleData(event) {
    const { name, value } = event.target;

    setMemberData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    setMessage(
      'Cooking for anyone else? Enter friends or family information below or click Finish to continue'
    );
    setSubmitted(true);
    addFamilyMember(memberData);
    setMemberData(DEFAULT_STATE);
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form align-left">
        <h1>{message}</h1>
        <Input
          onChange={handleData}
          name="fullName"
          value={memberData.fullName}
          label="Name"
          type="text"
          placeholder="Your Name"
        />
        <Input
          onChange={handleData}
          name="birthday"
          value={memberData.birthday}
          label="Birthday"
          type="date"
          placeholder=""
        />
        <Input
          onChange={handleData}
          value={memberData.gender}
          name="gender"
          label="Gender"
          type="text"
          placeholder="Gender"
        />
        <Input
          onChange={handleData}
          value={memberData.calories}
          name="calories"
          label="Daily Caloric Requirement"
          type="number"
          placeholder="Calorie Target"
        />
        <div>
          <button type="submit">Submit</button>
          {submitted && <button type="submit">Submit</button>}
        </div>
      </form>
      <Family submitted={submitted} />
    </div>
  );
}

export default Form;
