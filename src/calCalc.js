import male, { female } from './calRequirements';

//Calculate calorie requirement
function calCalc(age, gender, lifestyle) {
  let calArray = [];
  if (gender == 2) {
    calArray = male;
  } else {
    calArray = female;
  }

  let calories;
  const ageRange = calArray.filter((e) => age >= e.min && age <= e.max);
  const activity = ageRange[0].activityLevels;
  const activityLevel = activity.find((e) => e.activity == lifestyle);
  calories = (activityLevel.min + activityLevel.max) / 2;

  return calories;
}

export default calCalc;

// function calCalc(age, gender, activityLevel);
// let calArray = [];
// if (USER_DATA.gender == 'Male') {
//   calArray = male;
// } else {
//   calArray = female;
// }

// let calories;
// const ageRange = calArray.filter((e) => age >= e.min && age <= e.max);
// const activity = ageRange[0].activityLevels;
// const activityLevel = activity.find((e) => e.activity == USER_DATA.calTarget);
// calories = (activityLevel.min + activityLevel.max) / 2;
// USER_DATA.calories = calories;
