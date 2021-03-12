const [userToEdit, setUserToEdit] = useState({});

const [genderOptions, setGenderOptions] = useState([
  { value: 0, label: 'Unspecified' },
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' },
]);

const [lifestyleOptions, setLifestyleOptions] = useState([
  { value: 1, label: 'Moderately active' },
  { value: 0, label: 'Not very active' },
  { value: 2, label: 'Very active' },
]);

function clickToEdit(id) {
  const x = users.find((user, index) => index === id);

  setUserToEdit(x);

  // const userAge = ageCalc(users[id].birthday);

  // let userGender;
  // users[id].gender === 0
  //   ? (userGender = '')
  //   : users[id].gender === 1
  //   ? (userGender = 'Male')
  //   : (userGender = 'Female');

  // let userLifestyle;
  // users[id].calTarget === 0
  //   ? (userLifestyle = 'Not very active')
  //   : users[id].calTarget === 1
  //   ? (userLifestyle = 'Moderately Active')
  //   : (userLifestyle = 'Very Active');

  // setGenderOptions((prevVal) => {
  //   return prevVal.filter((option) => {
  //     return option.value !== users[id].gender;
  //   });
  // });

  // setLifestyleOptions((prevVal) => {
  //   return prevVal.filter((option) => {
  //     return option.value !== users[id].calTarget;
  //   });
  // });

  // setUserToEdit({
  //   fullName: users[id].fullName,
  //   color: users[id].color,
  //   birthday: users[id].birthday,
  //   age: userAge,
  //   gender: users[id].gender,
  //   calTarget: users[id].calTarget,
  //   calories: calCalc(userAge, userGender, users[id].calTarget),
  //   genderText: userGender,
  //   lifestyleText: userLifestyle,
  // });

  console.log(x.fullName);
}
