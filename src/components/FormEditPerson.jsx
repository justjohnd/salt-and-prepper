import React from 'react';
import Input from './Input';
import Button from './Button';

function FormEditPerson(props) {
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
          onChange={props.editUserData}
          name="birthday"
          value={props.formData.birthday}
          label="Birthday"
          type="text"
          placeholder=""
        />
        <label>
          Gender
          <select
            onChange={props.editUserData}
            value={props.formData.gender}
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
            onChange={props.editUserData}
            value={props.formData.calTarget}
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
