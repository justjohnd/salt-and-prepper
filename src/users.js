const USER_DATA = [
  {
    id: '1',
    fullName: 'John',
    color: '',
    birthday: '1978/06/13',
    age: '',
    gender: 1,
    calTarget: 2,
  },
  {
    id: '2',
    fullName: 'Miho',
    color: '',
    birthday: '1987/06/04',
    age: '',
    gender: 2,
    calTarget: 0,
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

function addUser(memberData) {
  const maximum = Math.max.apply(
    null,
    USER_DATA.map((x) => x.id)
  );

  let newMember = {
    ...memberData,
    color: '',
    id: maximum + 1,
  };
  USER_DATA.push(newMember);
}

export default USER_DATA;
export { colors };
export { addUser };
