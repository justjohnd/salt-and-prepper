import React, { useState } from 'react';
import USER_DATA from '../users';
import H2 from './H2';
import Button from './Button';
import UserCards from './UserCards';
import FormAddPerson from './FormAddPerson';
import FormEditPerson from './FormEditPerson';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function UserSection(props) {
  const [users, setUsers] = useState(USER_DATA);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formEditVisibility, setFormEditVisibility] = useState(false);
  const [message, setMessage] = useState(
    'Add family members to calculate your total nutritional requirement:'
  );
  const [editUser, setEditUser] = useState({
    id: '',
    fullName: '',
    birthday: '',
    gender: '',
    calTarget: '',
    userCal: '',
  });

  function editUserData(e) {
    let { name, value } = e.target;

    if (name === 'gender' || name === 'calTarget') {
      value = parseInt(value);
    }

    console.log(name);
    console.log(value);
    console.log(editUser);

    setEditUser(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }




  function changeFormVisibility() {
    setFormVisibility(prevValue => {
      return !prevValue;
    });
  }

  function changeFormEditVisibility() {
    setFormEditVisibility(prevValue => {
      return !prevValue;
    });
  }

  function addNewUser(newUser) {
    setUsers([...users, newUser]);
  }

  function deleteUser(id) {
    setUsers(prevVal => {
      return prevVal.filter(user => {
        return user.id !== id;
      });
    });
  }

  function clickToEdit(user) {
    setEditUser({
      id: user.id,
      fullName: user.fullName,
      birthday: user.birthday,
      gender: user.gender,
      calTarget: user.calTarget,
    });
  }

  function handleEdit(e) {
    setUsers(users => {
      return users.filter(user => {
        return user.id !== editUser.id;
      });
    });

    setUsers(users => {
      return [...users, editUser];
    });
    setEditUser({});
    e.preventDefault();
  }

  return (
    <section className="user-section flex-center">
      <div className="form">
        <H2 message={message} />
        <div>
          <p>
            <a href="#">Clear contents and start over</a>
          </p>
        </div>
        {formVisibility && (
          <FormAddPerson
            allUsers={users}
            changeFormVisibility={changeFormVisibility}
            addNewUser={addNewUser}
          />
        )}
        {formEditVisibility && (
          <FormEditPerson
            addNewUser={addNewUser}
            formData={editUser}
            handleEdit={handleEdit}
            editUserData={editUserData}
            changeFormEditVisibility={changeFormEditVisibility}
          />
        )}
        <div className="container flex-center">
          <UserCards
            addUserCal={props.addUserCal}
            users={users}
            onEdit={clickToEdit}
            onDelete={deleteUser}
            changeFormEditVisibility={changeFormEditVisibility}
            formEditVisibility={formEditVisibility}
            formVisibility={formVisibility}
            changeFormVisibility={changeFormVisibility}
          />
          {!formVisibility && (
            <Button
              className="btn-round btn-primary"
              onClick={() => {
                setFormVisibility(true);
                setFormEditVisibility(false);
                setMessage('Add a new person to your group:');
              }}
              buttonText={<PersonAddIcon />}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default UserSection;
