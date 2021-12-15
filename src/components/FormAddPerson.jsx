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

  function handleData(event) {
    let { name, value } = event.target;

    if (name === 'gender' || name === 'calTarget') {
      value = parseInt(value);
    }

    console.log(name);
    console.log(value);
    console.log(newUser);

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
          onChange={e => handleData(e)}
          name="fullName"
          value={newUser.fullName}
          label="Name"
          type="text"
          placeholder="Name"
        />
        <Input
          onChange={e => handleData(e)}
          name="birthday"
          value={newUser.birthday}
          label="Birthday"
          type="date"
          placeholder=""
        />
        <label>
          Gender
          <select
            onChange={e => handleData(e)}
            value={newUser.gender}
            name="gender"
            type="number"
            placeholder="Gender"
          >
            <option value="1">Unspecified</option>
            <option value="2">Male</option>
            <option value="3">Female</option>
          </select>
        </label>
        <label>
          Lifestyle
          <select
            onChange={e => handleData(e)}
            value={newUser.calTarget}
            name="calTarget"
            type="type"
            placeholder="Select or enter specific calorie target"
          >
            <option value="1">Not Very Active</option>
            <option value="2">Moderately Active</option>
            <option value="3">Very Active</option>
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
