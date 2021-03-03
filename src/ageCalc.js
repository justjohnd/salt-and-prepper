//Calculate age
function ageCalc(birthday) {
  let age;
  let today = new Date();
  if (birthday) {
    let birthDate = new Date(birthday);
    age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  }

  return age;
}

export default ageCalc;
