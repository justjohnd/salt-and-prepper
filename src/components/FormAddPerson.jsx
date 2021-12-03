import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

function FormAddPerson(props) {
  const [newUser, setNewUser] = useState({
    id: '',
    fullName: '',
    birthday: '',
    age: '',
    gender: '',
    calTarget: '',
  });

  const DEFAULT_STATE = {
    id: '',
    fullName: '',
    birthday: '',
    age: '',
    gender: '',
    calTarget: '',
  };

  const genderOptions = [
    { value: 1, label: 'Unspecified' },
    { value: 2, label: 'Male' },
    { value: 3, label: 'Female' },
  ];

  const lifestyleOptions = [
    { value: 2, label: 'Moderately active' },
    { value: 1, label: 'Not very active' },
    { value: 3, label: 'Very active' },
  ];

  function handleData(event) {
    const { name, value } = event.target;
    let maxId = props.allUsers.reduce(
      (max, cur) => (max > cur.id ? max : cur.id),
      props.allUsers[0].id
    );
    let newMax = maxId + 1;

    setNewUser(prevValue => {
      return {
        ...prevValue,
        [name]: value,
        id: newMax,
      };
    });
  }

  function handleAddUser(event) {
    props.addNewUser(newUser);
    setNewUser(DEFAULT_STATE);
    event.preventDefault();
  }

  function handleCloseSection(event) {
    props.changeFormVisibility();
    event.preventDefault();
  }

  return (
    <div>
      <form className="form align-left">
        <Input
          onChange={handleData}
          name="fullName"
          value={newUser.fullName}
          label="Name"
          type="text"
          placeholder="Name"
        />
        <Input
          onChange={handleData}
          name="birthday"
          value={newUser.birthday}
          label="Birthday"
          type="date"
          placeholder=""
        />
        <label>
          Gender
          <select
            onChange={handleData}
            value={newUser.gender}
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
            value={newUser.calTarget}
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

        <Button
          className="btn-primary"
          onClick={handleAddUser}
          buttonText="Add Person"
        />
        <Button
          className="btn-primary"
          onClick={handleCloseSection}
          buttonText="Close Section"
        />
      </form>
    </div>
  );
}

export default FormAddPerson;
