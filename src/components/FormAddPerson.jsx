import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

function FormAddPerson(props) {
  const [memberData, setMemberData] = useState({
    fullName: '',
    birthday: '',
    age: '',
    gender: '',
    calTarget: '',
  });

  const DEFAULT_STATE = {
    fullName: '',
    birthday: '',
    age: '',
    gender: '',
    calTarget: '',
  };

  const [genderOptions, setGenderOptions] = useState([
    { value: 0, label: 'Unspecified' },
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
  ]);

  const [lifestyleOptions, setlifestyleOptions] = useState([
    { value: 1, label: 'Moderately active' },
    { value: 0, label: 'Not very active' },
    { value: 2, label: 'Very active' },
  ]);

  function handleData(event) {
    const { name, value } = event.target;

    setMemberData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleAddUser(event) {
    const newUser = memberData;
    props.addNewUser(newUser);
    setMemberData(DEFAULT_STATE);
    event.preventDefault();
  }

  function handleCloseSection(event) {
    props.toggleForm(props.showForm);
    event.preventDefault();
  }

  return (
    <div>
      <form className="form align-left">
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
        <label>
          Gender
          <select
            onChange={handleData}
            value={memberData.gender}
            name="gender"
            type="number"
            placeholder="Gender"
          >
            {genderOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Lifestyle
          <select
            onChange={handleData}
            value={memberData.calTarget}
            name="calTarget"
            type="type"
            placeholder="Select or enter specific calorie target"
          >
            {lifestyleOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <Button onClick={handleAddUser} buttonText="Add Person" />
        <Button onClick={handleCloseSection} buttonText="Close Section" />
      </form>
    </div>
  );
}

export default FormAddPerson;
