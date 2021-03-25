const USER_DATA = [
  {
    id: 1,
    fullName: 'John',
    color: '',
    birthday: '06/13/1978',
    age: '',
    gender: 2,
    calTarget: 3,
  },
  {
    id: 2,
    fullName: 'Miho',
    color: '',
    birthday: '06/04/1987',
    age: '',
    gender: 3,
    calTarget: 1,
  },
  {
    id: 3,
    fullName: 'Kai',
    color: '',
    birthday: '06/14/2019',
    age: '',
    gender: 2,
    calTarget: 2,
  },
];

const colors = ['#314e52', '#f2a154', '#f76b8a', '#e7e6e1'];

//addUser Function currently not being used. Instead id is generated under handleAddUser in the FormAddPerson component.
// function addUser(memberData) {
//   const maximum = Math.max.apply(
//     null,
//     USER_DATA.map((x) => x.id)
//   );

//   let newMember = {
//     ...memberData,
//     color: '',
//     // id: maximum + 1,
//   };
//   USER_DATA.push(newMember);
// }

export default USER_DATA;
export { colors };
// export { addUser };
