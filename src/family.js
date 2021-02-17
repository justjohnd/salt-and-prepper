const family = [
  {
    id: '1',
    name: 'John',
    color: '',
    age: '42',
    gender: 'Male',
    calTarget: '2000',
  },
  {
    id: '2',
    name: 'Miho',
    color: '',
    age: '33',
    gender: 'Female',
    calTarget: '2000',
  },
  {
    id: '3',
    name: 'Kai',
    color: '',
    age: '2',
    gender: 'male',
    calTarget: '1000',
  },
];

const colors = ['#314e52', '#f2a154', '#f76b8a', '#e7e6e1'];

function addFamilyMember(name, birthday, gender, calories) {
  const maximum = Math.max.apply(
    null,
    family.map((x) => x.id)
  );

  let newMember = {
    name: name,
    age: birthday,
    gender: gender,
    calTarget: calories,
    color: '',
    id: maximum + 1,
  };
  family.push(newMember);
}

export default family;
export { colors };
export { addFamilyMember };
