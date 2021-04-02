//Goal get as close as possible to target by increasing any array value by a multiple
const target = 2000;
const array = [440, 255, 345, 458, 250];
const total = array.reduce((acc, cur) => acc + cur);
const diff = target - total;

//check to see difference between difference and each array number
const deviation = array.map(e => Math.abs(e - diff));
const minDeviation = Math.min(...deviation);
const multiplierIndex = deviation.indexOf(minDeviation);

//Multiply the number with smallest deviation by 2 and check result
const newArray = [...array];
newArray.splice(multiplierIndex, 1, array[multiplierIndex] * 2);
const newTotal = newArray.reduce((acc, cur) => acc + cur);
