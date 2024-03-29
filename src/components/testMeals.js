const TEST_MEALS = [
  {
    id: 715769,
    usedIngredientCount: 0,
    missedIngredientCount: 6,
    missedIngredients: [
      {
        id: 98840,
        amount: 1,
        unit: 'bunch',
        unitLong: 'bunch',
        unitShort: 'bunch',
        aisle: 'Produce',
        name: 'broccolini',
        original: '1 bunch broccolini, trimmed',
        originalString: '1 bunch broccolini, trimmed',
        originalName: 'broccolini, trimmed',
        metaInformation: ['trimmed'],
        meta: ['trimmed'],
        extendedName: 'trimmed broccolini',
        image: 'https://spoonacular.com/cdn/ingredients_100x100/broccolini.jpg',
      },
      {
        id: 11215,
        amount: 1,
        unit: '',
        unitLong: '',
        unitShort: '',
        aisle: 'Produce',
        name: 'garlic clove',
        original: '1 garlic clove, minced',
        originalString: '1 garlic clove, minced',
        originalName: 'garlic clove, minced',
        metaInformation: ['minced'],
        meta: ['minced'],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/garlic.png',
      },
      {
        id: 11282,
        amount: 0.5,
        unit: 'cup',
        unitLong: 'cups',
        unitShort: 'cup',
        aisle: 'Produce',
        name: 'onion',
        original: '½ cup onion',
        originalString: '½ cup onion',
        originalName: 'onion',
        metaInformation: [],
        meta: [],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png',
      },
      {
        id: 20035,
        amount: 1,
        unit: 'cup',
        unitLong: 'cup',
        unitShort: 'cup',
        aisle: 'Pasta and Rice;Health Foods',
        name: 'quinoa',
        original: '1 cup quinoa, rinsed',
        originalString: '1 cup quinoa, rinsed',
        originalName: 'quinoa, rinsed',
        metaInformation: ['rinsed'],
        meta: ['rinsed'],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/uncooked-quinoa.png',
      },
      {
        id: 6615,
        amount: 2,
        unit: 'cups',
        unitLong: 'cups',
        unitShort: 'cup',
        aisle: 'Canned and Jarred',
        name: 'vegetable broth',
        original: '2 cups vegetable broth',
        originalString: '2 cups vegetable broth',
        originalName: 'vegetable broth',
        metaInformation: [],
        meta: [],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png',
      },
      {
        id: 12155,
        amount: 2,
        unit: 'oz',
        unitLong: 'ounces',
        unitShort: 'oz',
        aisle: 'Nuts;Baking',
        name: 'walnuts',
        original: '2 oz chopped walnuts',
        originalString: '2 oz chopped walnuts',
        originalName: 'chopped walnuts',
        metaInformation: ['chopped'],
        meta: ['chopped'],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/walnuts.jpg',
      },
    ],
    likes: 0,
    usedIngredients: [],
    unusedIngredients: [],
    title: 'Broccolini Quinoa Pilaf',
    image: 'https://spoonacular.com/recipeImages/715769-312x231.jpg',
    imageType: 'jpg',
    nutrition: {
      nutrients: [
        {
          title: 'Calories',
          name: 'Calories',
          amount: 625.074,
          unit: 'kcal',
        },
        {
          title: 'Protein',
          name: 'Protein',
          amount: 19.8555,
          unit: 'g',
        },
        {
          title: 'Fat',
          name: 'Fat',
          amount: 30.6937,
          unit: 'g',
        },
        {
          title: 'Carbohydrates',
          name: 'Carbohydrates',
          amount: 71.6636,
          unit: 'g',
        },
        {
          title: 'Sugar',
          name: 'Sugar',
          amount: 6.44592,
          unit: 'g',
        },
      ],
    },
    dontInclude: false,
    addCalories: false,
  },
  {
    id: 652417,
    usedIngredientCount: 0,
    missedIngredientCount: 13,
    missedIngredients: [
      {
        id: 11090,
        amount: 1,
        unit: 'cup',
        unitLong: 'cup',
        unitShort: 'cup',
        aisle: 'Produce',
        name: 'broccoli',
        original: '1 cup broccoli',
        originalString: '1 cup broccoli',
        originalName: 'broccoli',
        metaInformation: [],
        meta: [],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/broccoli.jpg',
      },
      {
        id: 16058,
        amount: 1,
        unit: 'can',
        unitLong: 'can',
        unitShort: 'can',
        aisle: 'Canned and Jarred',
        name: 'canned chickpeas',
        original: '1 can chickpeas, rinsed and drained',
        originalString: '1 can chickpeas, rinsed and drained',
        originalName: 'chickpeas, rinsed and drained',
        metaInformation: ['rinsed', 'drained'],
        meta: ['rinsed', 'drained'],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/chickpeas.png',
      },
      {
        id: 11124,
        amount: 2,
        unit: 'large',
        unitLong: 'larges',
        unitShort: 'large',
        aisle: 'Produce',
        name: 'carrots',
        original: '2 large carrots, chopped',
        originalString: '2 large carrots, chopped',
        originalName: 'carrots, chopped',
        metaInformation: ['chopped'],
        meta: ['chopped'],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/sliced-carrot.png',
      },
      {
        id: 10111143,
        amount: 2,
        unit: '',
        unitLong: '',
        unitShort: '',
        aisle: 'Produce',
        name: 'celery stalks',
        original: '2 celery stalks, chopped ili 1/3 cup chopped celery root',
        originalString:
          '2 celery stalks, chopped ili 1/3 cup chopped celery root',
        originalName: 'celery stalks, chopped ili 1/3 cup chopped celery root',
        metaInformation: ['chopped'],
        meta: ['chopped'],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/celery.jpg',
      },
      {
        id: 16070,
        amount: 0.5,
        unit: 'cup',
        unitLong: 'cups',
        unitShort: 'cup',
        aisle: 'Pasta and Rice;Canned and Jarred',
        name: 'cooked lentils',
        original: '½ cup cooked lentils',
        originalString: '½ cup cooked lentils',
        originalName: 'cooked lentils',
        metaInformation: ['cooked'],
        meta: ['cooked'],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/lentils-brown.jpg',
      },
      {
        id: 20028,
        amount: 1,
        unit: 'cup',
        unitLong: 'cup',
        unitShort: 'cup',
        aisle: 'Pasta and Rice;Ethnic Foods;Health Foods',
        name: 'couscous',
        original: '1 cup couscous',
        originalString: '1 cup couscous',
        originalName: 'couscous',
        metaInformation: [],
        meta: [],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/couscous-cooked.jpg',
      },
      {
        id: 11165,
        amount: 3,
        unit: 'servings',
        unitLong: 'servings',
        unitShort: 'servings',
        aisle: 'Produce;Spices and Seasonings',
        name: 'fresh cilantro',
        original: 'Fresh cilantro, optional',
        originalString: 'Fresh cilantro, optional',
        originalName: 'Fresh cilantro, optional',
        metaInformation: ['fresh'],
        meta: ['fresh'],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/cilantro.png',
      },
      {
        id: 1012010,
        amount: 0.125,
        unit: 'tsp',
        unitLong: 'teaspoons',
        unitShort: 'tsp',
        aisle: 'Spices and Seasonings',
        name: 'ground cinnamon',
        original: '⅛ tsp ground cinnamon',
        originalString: '⅛ tsp ground cinnamon',
        originalName: 'ground cinnamon',
        metaInformation: [],
        meta: [],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg',
      },
      {
        id: 1002014,
        amount: 2,
        unit: 'tsp',
        unitLong: 'teaspoons',
        unitShort: 'tsp',
        aisle: 'Spices and Seasonings',
        name: 'ground cumin',
        original: '2 tsp ground cumin',
        originalString: '2 tsp ground cumin',
        originalName: 'ground cumin',
        metaInformation: [],
        meta: [],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/ground-cumin.jpg',
      },
      {
        id: 2043,
        amount: 0.5,
        unit: 'tsp',
        unitLong: 'teaspoons',
        unitShort: 'tsp',
        aisle: 'Spices and Seasonings',
        name: 'ground turmeric',
        original: '½ tsp ground turmeric',
        originalString: '½ tsp ground turmeric',
        originalName: 'ground turmeric',
        metaInformation: [],
        meta: [],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/turmeric.jpg',
      },
      {
        id: 9152,
        amount: 1,
        unit: 'Tbs',
        unitLong: 'Tb',
        unitShort: 'Tbs',
        aisle: 'Produce',
        name: 'lemon juice',
        original: '1 Tbs lemon juice',
        originalString: '1 Tbs lemon juice',
        originalName: 'lemon juice',
        metaInformation: [],
        meta: [],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg',
      },
      {
        id: 2028,
        amount: 2,
        unit: 'tsp',
        unitLong: 'teaspoons',
        unitShort: 'tsp',
        aisle: 'Spices and Seasonings',
        name: 'paprika',
        original: '2 tsp paprika',
        originalString: '2 tsp paprika',
        originalName: 'paprika',
        metaInformation: [],
        meta: [],
        image: 'https://spoonacular.com/cdn/ingredients_100x100/paprika.jpg',
      },
      {
        id: 11887,
        amount: 2,
        unit: 'Tbs',
        unitLong: 'Tbs',
        unitShort: 'Tbs',
        aisle: 'Pasta and Rice',
        name: 'tomato paste',
        original: '2-3 Tbs tomato paste',
        originalString: '2-3 Tbs tomato paste',
        originalName: 'tomato paste',
        metaInformation: [],
        meta: [],
        image:
          'https://spoonacular.com/cdn/ingredients_100x100/tomato-paste.jpg',
      },
    ],
    likes: 0,
    usedIngredients: [],
    unusedIngredients: [],
    title: 'Moroccan chickpea and lentil stew',
    image: 'https://spoonacular.com/recipeImages/652417-312x231.jpg',
    imageType: 'jpg',
    nutrition: {
      nutrients: [
        {
          title: 'Calories',
          name: 'Calories',
          amount: 465.686,
          unit: 'kcal',
        },
        {
          title: 'Protein',
          name: 'Protein',
          amount: 20.052,
          unit: 'g',
        },
        {
          title: 'Fat',
          name: 'Fat',
          amount: 7.26574,
          unit: 'g',
        },
        {
          title: 'Carbohydrates',
          name: 'Carbohydrates',
          amount: 82.4647,
          unit: 'g',
        },
        {
          title: 'Sugar',
          name: 'Sugar',
          amount: 5.0624,
          unit: 'g',
        },
      ],
    },
    dontInclude: false,
    addCalories: false,
  },
];

export default TEST_MEALS;
