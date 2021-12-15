import React from 'react';
import Input from './Input';
import Button from './Button';

function FormEditPerson(props) {
  // function handleCloseSection(event) {
  //   props.changeFormEditVisibility();
  //   event.preventDefault();
  // }

  return (
    <div>
      <form className="form align-left">
        <Input
          onChange={e => props.editUserData(e)}
          name="fullName"
          value={props.formData.fullName}
          label="Name"
          type="text"
          placeholder={props.formData.fullName}
        />
        <Input
          onChange={e => props.editUserData(e)}
          name="birthday"
          value={props.formData.birthday}
          label="Birthday"
          type="text"
          placeholder=""
        />
        <label>
          <select
            onChange={e => props.editUserData(e)}
            selected
            value={props.formData.gender}
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
            onChange={e => props.editUserData(e)}
            selected
            value={props.formData.calTarget}
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
          className="btn-lg"
          onClick={e => {
            props.handleEdit(e);
            props.changeFormEditVisibility();
            e.preventDefault();
          }}
          buttonText="Submit"
        />
        <Button
          className="btn-lg"
          onClick={e => {
            props.changeFormEditVisibility();
            e.preventDefault();
          }}
          buttonText="Cancel"
        />
      </form>
    </div>
  );
}

export default FormEditPerson;
