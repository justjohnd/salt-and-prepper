import { TurnedInNotOutlined } from '@material-ui/icons';

const BAD_API_IDS = {
  624304: true,
  638790: true,
  624194: true,
  157109: true,
  765725: true,
};

const DONT_INCLUDE = {
  chocolate: true,
  cookies: true,
  cake: true,
  ice: true,
  tart: true,
  cheesecake: true,
  brownie: true,
  brownies: true,
  choco: true,
};

const KEYWORDS = {
  bread: true,
  pizza: true,
  sandwich: true,
  sandwiches: true,
  soup: true,
  thighs: true,
  frittata: true,
  pumpkin: true,
  egg: true,
  eggs: true,
  naan: true,
  ramen: true,
  whitefish: true,
  burger: true,
  tacos: true,
  enchiladas: true,
  quesadillas: true,
  chorizo: true,
  tostadas: true,
  alfredo: true,
  catfish: true,
  curry: true,
  crab: true,
  porridge: true,
  shrimp: true,
  quinoa: true,
  avocado: true,
  beef: true,
  masala: true,
  pakoda: true,
  omelet: true,
  dip: true,
  salse: true,
};

const DONT_ADD_CALORIES = {
  quinoa: true,
  sandwich: true,
  sandwiches: true,
  rice: true,
  pizza: true,
  puppies: true,
  pasta: true,
  BLT: true,
  quiche: true,
  beriyani: true,
  pilaf: true,
  macaroni: true,
  mac: true,
  burger: true,
  burgers: true,
  pita: true,
  pocket: true,
  waffle: true,
  pancake: true,
  flatbread: true,
  grain: true,
  spaghetti: true,
  linguine: true,
  penne: true,
  noodle: true,
  noodles: true,
  pie: true,
  tortilla: true,
  taco: true,
  tacos: true,
  quesadilla: true,
  quesadillas: true,
  burrito: true,
  burritos: true,
  tostada: true,
  tostadas: true,
  croquettes: true,
  wrap: true,
  enchilada: true,
  enchiladas: true,
};

const MUST_ADD_CALORIES = {
  dip: true,
  salsa: true,
};

export default KEYWORDS;
export { DONT_INCLUDE };
export { DONT_ADD_CALORIES };
export { BAD_API_IDS };
