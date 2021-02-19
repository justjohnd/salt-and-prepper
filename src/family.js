const family = [
  {
    id: '1',
    fullName: 'John',
    color: '',
    age: '42',
    gender: 'Male',
    calTarget: '2000',
  },
  {
    id: '2',
    fullName: 'Miho',
    color: '',
    age: '33',
    gender: 'Female',
    calTarget: '2000',
  },
  {
    id: '3',
    fullName: 'Kai',
    color: '',
    age: '2',
    gender: 'male',
    calTarget: '1000',
  },
];

const colors = ['#314e52', '#f2a154', '#f76b8a', '#e7e6e1'];

function addFamilyMember(memberData) {
  const maximum = Math.max.apply(
    null,
    family.map((x) => x.id)
  );

  let newMember = {
    ...memberData,
    color: '',
    id: maximum + 1,
  };
  family.push(newMember);
}

export default family;
export { colors };
export { addFamilyMember };
