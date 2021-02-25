import React, { useState, useEffect } from 'react';
import Input from './Input';
import Family from './Family';
import H2 from './H2';
import { addFamilyMember } from '../family';
import FormSecMealPlan from './FormSecMealPlan';

function Form() {
  const [message, setMessage] = useState(
    'Please let us know a little information in order to calculate your daily nutritional needs'
  );
  const [submitMember, setSubmitMember] = useState(false);
  const [submitNext, setSubmitNext] = useState(false);

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
      'Cooking for anyone else? Enter friends or family information below or click Next to continue'
    );
    setSubmitMember(true);
    addFamilyMember(memberData);
    setMemberData(DEFAULT_STATE);
    event.preventDefault();
  }

  function handleNextSection(event) {
    setSubmitNext(true);
    event.preventDefault();
  }

  return (
    <div>
      <form className="form align-left">
        <H2 message={message} />
        <Input
          onChange={handleData}
          name="fullName"
          value={memberData.fullName}
          label="Name"
          type="text"
          placeholder="Name"
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
        <button onClick={handleSubmit} type="submit">
          Add Person
        </button>
        {submitMember && (
          <button onClick={handleNextSection} type="submit">
            Next Section
          </button>
        )}
        <Family />
        {submitNext && <FormSecMealPlan />}
      </form>
    </div>
  );
}

export default Form;
