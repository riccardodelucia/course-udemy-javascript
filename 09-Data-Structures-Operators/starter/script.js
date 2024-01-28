'use strict';

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

  // returning more than one element
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  orderDelivery({ starterIndex = 1, mainIndex = 1, time = '20:00', address }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  }
};

/******************************
 * 103. Destructuring Arrays
 ******************************/
// Destructuring examples
const arr = [1, 2, 3];

// 1. putting array values into variables
const [x, y, z] = arr;
console.log(x, y, z);

// 2. Skipping elements while destructuring
const [a, , b] = arr;
console.log(a, b);

// 3. Nested destructuring
const nested = [1, 2, [3, 4]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// 4. Default values for inexistent elements
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

// 5. Switching variables
const [starter, main] = restaurant.order(2, 0);

let [main1, secondary1] = restaurant.categories;
console.log(main1, secondary1);
[main1, secondary1] = [secondary1, main1];
console.log(main1, secondary1);


/******************************
 * 104. Destructuring Objects
 ******************************/
// 1. Simple destructuring with object's property names
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// 2. Renaming variables out of object properties
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

// 3. Default values for non-existent properties + optional renaming
const { menu = [], starterMenu: starters = [] } = restaurant;

// 4. mutating variables with values from objects
// Goal: reassign a and b values from object's a and b properties
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
// cannot do let {a, b} = obj; since a and b already exist
// one should bypass variable declaration with something like {a, b} = obj;
// this raises an error, since opening a curly braces suggests the start of a new block,
// which is not our case.

// SOLUTION: NEED PARENTHESIS TO CREATE AN EXPRESSION TO ESCAPE THE CURLY BRACES
({ a, b } = obj);

// now a and b are reassinged with values from the object

// 5. Nested objects
// Needs the name of the nested object and then its properties
const { fri: { open: o, close: c }, } = openingHours; // use the nested object without the parent object
console.log(o, c);

// 6. Calling an object method by passing an object with optional argument
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2
})



/******************************
 * 105. The Spread Operator (...)
 ******************************/
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// 1. Spread Operator basics
console.log(...arr);

// 2. Add elements from an old array into a new array with Spread Operator
const newArr = [1, 2, ...arr];
console.log(newArr);

// 3. Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// 4. Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// 5. Spread on a string
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// 6. Spread operator calling functions
const ingredients = [prompt("Let\'s make pasta!' Ingredient 1?"), prompt("Ingredient 2?"), prompt("Ingredient 3?")];
restaurant.orderPasta(...ingredients);

// 7. Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant);

// 8. Shallow copy of objects
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);



/******************************
 * 106. Rest Pattern and Parameters
 ******************************/
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// 1. Rest and Spread together
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);

// 2. Rest with objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Rest operator with functions with arbitrary length arrays
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++)
    sum += numbers[i];
  console.log(sum);

}
add(2, 3);
add(5, 3, 7, 2);
add(8, 3, 4, 2, 7);

// Rest and spread with functions
const x = [23, 4, 7];
add(...x);

// Advanced rest example
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');



/******************************
 * 107. Short Circuiting (&& and ||)
 ******************************/
// OR

console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// comment restaurant.numGuests = 23; to see what happens
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// AND
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'jonas');



/******************************
 * 108. Nullish Coalescing Operator
 ******************************/
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3);

// Nullish: null and undefined (NOT 0 or '')
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);


/******************************
 * 110. Looping Arrays: The for-of Loop
 ******************************/
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries())
  console.log(`${i + 1}: ${el}`);



/******************************
 * 112. Optional Chaining
 *****************************/
// No optional chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// With optional chaining
console.log(restaurant.openingHours.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining with methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

// Optional chaining with arrays
const users = [{ name: 'Jonas', mail: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'Users array empty');



/******************************
 * 113. Looping Objects: Object Keys, Values and Entries
 *****************************/
// Iterating objects' PROPERTIES
const properties = Object.keys(openingHours);
console.log(properties);

for (const day of properties)
  console.log(day);

// Iterating objects' VALUES
const values = Object.values(openingHours);
console.log(values);

for (const value of values)
  console.log(value);

// Iterating objects' KEY:VALUE pairs
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries)
  console.log(`On ${key}, we open at ${open} and close at ${close}`);



/******************************
 * 115. Sets
 *****************************/
const orderSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta']);
console.log(orderSet);
console.log(orderSet.has('Pizza'));
orderSet.add('Garlic bread');
orderSet.delete('Risotto');

const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(orderSet.size);


/******************************
 * 116. Maps: Fundamentals
 *****************************/
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy').set(2, 'Lisbon, Portugal');
rest.set(true, 'We are open!');
rest.set(false, 'We are closed!');
rest.set('open', 11);
rest.set('close', 23);
console.log(rest);

console.log(rest.get('name'));

const time = 21;

console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);

console.log(rest.size);

rest.clear();

//using arrays as map keys
//wrong
rest.set([1, 2], 'test');
console.log(rest.get([1, 2])); // does not work, [1, 2] is a separated array wrt the key of the map

//correct
const arr = [1, 2];
rest.set(arr, 'test');
console.log(rest.get(arr));


/******************************
 * 117. Maps: Iteration
 *****************************/
const question = new Map([
  ['question', 'What is the best programming language in the world?'], [1, 'C'], [2, 'Java'], [3, 'JavaScript'], ['correct', 3], [true, 'Correct!'], [false, 'Wrong answer!']
]);

console.log(question);

// convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

for (const [key, value] of question)
  if (typeof key == 'number') console.log(`Answer ${key}:${value}`);

const answer = Number(prompt('Your answer'));
console.log(answer);
console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);




/******************************
 * 120. Working with Strings - Part 1
 *****************************/
// STRINGS
const airline = 'TAP Air Portugal';
//const plane = 'A320';

console.log(airline[0]);

console.log(airline.indexOf('r')); // index of first occurrence
console.log(airline.lastIndexOf('r')); // index of last occurrence
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4)); // return string from character with index 4
console.log(airline.slice(4, 7)); // end value not included in the string

console.log(airline.slice(0, airline.indexOf(' '))); // extract first word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //extract last word

console.log(airline.slice(-2)); // start from second last index
console.log(airline.slice(1, -1)); // filter out first and last character

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E')
    console.log('You got the middle seat');
  else console.log('You got lucky');
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

const myStringObject = new String('test');
console.log(myStringObject);


/******************************
 * 121. Working with Strings - Part 2
 *****************************/
console.log(airline.toLowerCase);
console.log(airline.toUpperCase);

// Fix capitalization in name
const passenger = 'jOnAS'; // instead of 'Jonas'
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// fix wrong email string
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.io \n';
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// Replace parts of strings
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

// use regular expressions
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('Part of the NEW Airbus family');

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('You are NOT allowed on board');
  else
    console.log('Welcome aboard!');
}

checkBaggage('I have a laptop, some Food anda a pockets Knife');
checkBaggage('Sockes and camera');
checkBaggage('Got some snacks and a gun for protection');


/******************************
 * 122. Working with Strings - Part 3
 *****************************/
console.log('a+very+nice+string'.split('+'));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

// glue strings together by putting a separator
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
}

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
console.log(message.padEnd(25, '+'));
console.log(message.padStart(25, '+').padEnd(30, '+'));

// Hide credit card number

const maskCreditCard = function (number) {
  // convert number to string
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
}

console.log(maskCreditCard(2525253671273817371));


// Repeat strings multiple times
const message2 = 'Bad weather... All departures Delayed...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈︎'.repeat(n)}`);
}

planesInLine(5);
planesInLine(2);
planesInLine(12);


/****************************************************************
 * CODING CHALLENGES
 ***************************************************************/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 7.33,
    x: 3.25,
    team2: 6.5,
  },
};


/*******************************
 * Coding Challenge #1
 *******************************/
/*
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [gk1, ...fieldPlayers1] = players1;
console.log(gk1, fieldPlayers1);
const [gk2, ...fieldPlayers2] = players2;
console.log(gk2, fieldPlayers2);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1]
console.log(players1Final);

// 5.
const { odds: { team1, x: draw, team2 } } = game;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players) {

  for (let i = 0; i < players.length; i++)
    console.log(players[i]);
  console.log(`Total scored goals: ${players.length}`);

};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// 7.
(team1 < team2) && console.log('Team 1 is more likely to win');
(team1 > team2) && console.log('Team 2 is more likely to win');


/*******************************
 * Coding Challenge #2
 *******************************/
/*
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
    Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
*/

// 1.
for (const [i, score] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${score} `);

// 2.
let sum = 0;
const oddsArray = Object.values(game.odds);
for (const odd of oddsArray) {
  sum += odd
}
console.log(`Average odd: ${sum / oddsArray.length} `);

// 3.
for (const [key, odd] of Object.entries(game.odds)) {
  const substr = game?.[`${key} `] || 'draw';
  let msg = 'Odd of ';
  if (substr !== 'draw')
    msg += (`victory ${substr} `);
  else
    msg += 'draw'
  msg += `: ${odd} `
  console.log(msg);
}

for (const [key, odd] of Object.entries(game.odds)) {
  const substr = key === 'x' ? 'draw' : `victory of ${game[key]} `;
  console.log(`Odd of ${substr}: ${odd} `);

}

// BONUS.
let scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);


/*******************************
 * Coding Challenge #3
 *******************************/
/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, it was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


// 1.
const events = [...new Set(gameEvents.values())]
console.log(events);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// 3.
let sumOfEvents = 0;
let old = 0;
for (const key of gameEvents.keys()) {
  sumOfEvents += (key - old);
  console.log(key - old);
  old = key;
}
console.log(`An event happened, on average, every ${Math.trunc(sumOfEvents / gameEvents.size)} minutes`);

// 4.
for (const [key, value] of gameEvents)
  if (key <= 45)
    console.log(`[FIRST HALF]${key}: ${value} `);
  else
    console.log(`[SECOND HALF]${key}: ${value} `);


/*******************************
 * Coding Challenge #4
 *******************************/
/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));


document.querySelector('button').addEventListener('click', function () {
  console.log('Button pressed!');
  const text = document.querySelector('textarea').value;
  console.log(text);

  const [...lines] = text.split('\n');
  console.log(lines);

  for (const [i, str] of lines.entries()) {
    const [word1, word2] = str.toLowerCase().trim().split('_');
    let finalLine = word1 + word2[0].toUpperCase() + word2.slice(1);
    finalLine = finalLine.padEnd(20, ' ') + '✅'.repeat(i + 1);
    console.log(finalLine);
  }
});