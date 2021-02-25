const male = [
  {
    activityLevels: [
      {
        activity: 'low',
        min: 1400,
        max: 1400,
      },
      {
        activity: 'normal',
        min: 1400,
        max: 1600,
      },
      {
        activity: 'high',
        min: 1600,
        max: 2000,
      },
    ],
    min: 4,
    max: 8,
  },
  {
    min: 14,
    max: 18,
  },

  {
    min: 9,
    max: 13,
  },
  {
    min: 19,
    max: 30,
  },
  {
    min: 31,
    max: 50,
    activityLevels: [
      {
        activity: 'low',
        min: 2200,
        max: 2200,
      },
      {
        activity: 'normal',
        min: 2400,
        max: 2600,
      },
      {
        activity: 'high',
        min: 2800,
        max: 3000,
      },
    ],
  },
  {
    min: 51,
    max: 150,
  },
];

const getCal = (array, age, activity) => {
  let targetAge = array.filter((e) => age >= e.min && age <= e.max);
  let targetActivity = targetAge[0].activityLevels;
  let activityLevel = (e) => e.activity === activity;
  return targetActivity.find(activityLevel);
};

export default getCal;
