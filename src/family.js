const family = [
  {
    id: '1',
    fullName: 'John',
    color: '',
    birthday: '1978/06/13',
    age: '',
    gender: 1,
    calTarget: 1,
  },
  {
    id: '2',
    fullName: 'Miho',
    color: '',
    birthday: '1987/06/04',
    age: '',
    gender: 2,
    calTarget: 1,
  },
  {
    id: '3',
    fullName: 'Kai',
    color: '',
    birthday: '1978/06/13',
    age: '',
    gender: 1,
    calTarget: 1,
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
