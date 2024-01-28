'use strict';

/****************************
 * 126. Default Parameters
 ***************************/
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);

// skipping intermediate parameters through undefined
// undefined values correspond to empty parameters, that are then assigned with the default value
createBooking('LH123', undefined, 1000);

/****************************
 * 127. How Passing Arguments Works: Values vs. Reference
 ***************************/
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

// newPassport modifies the passport and makes troubles for checkIn function
newPassport(jonas);
checkIn(flight, jonas); // Wrong passport!

/****************************
 * 129. Functions Accepting Callback Functions
 ***************************/

// callback (lower-order) function
const oneWord = function (str) {
  // replace spaces with no spaces
  return str.replace(/ /g, '').toLowerCase();
};

// callback (lower-order) function
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// this is an higher-order function wrt fn
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  // as objects, functions have some properties, like their names
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('👋🏻');
};
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

/****************************
 * 130. Functions Returning Functions
 ***************************/
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// store the result of greet into greeterHey, which is a function
const greeterHey = greet('Hey');

// greeterHey is actually function (name) {console.log(`${greeting} ${name}`);}
// calling greeterHey with the specified name
// greeting parameter still exists because of closure (see later in the course)
greeterHey('Jonas');
greeterHey('Steven');

// this also works
greet('Hello')('Jonas');

// rewrite greet with arrow function
const greet2 = greeting => name => console.log(`${greeting} ${name}`);

greet2('Ciao')('Riccardo');

/****************************
 * 131. The call and apply Methods
 ***************************/
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book is no longer a method, it's a function -> 'this' is therefore undefined
//book(23, 'Sarah Williams'); //does not work

// Solution 1: CALL method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

// call accepts as a first argument the object to set the this keyword to that element.
// the following elements are the original elements of the called method
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss ',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Solution 2: APPLY method
// Same as CALL but does not accept multiple arguments.
// Instead, it receives an array as the secondo parameter.
const flightData = [583, 'George cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// APPLY is no more used in modern JS, use instead APPLY and optionally the spread operator
book.call(swiss, ...flightData);

/****************************
 * 132. The Bind Method
 ***************************/
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

// Using bind to specify specific parameters for the function
// example: set a function with standard flight number = 23
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// problem: the callback points to the button instead of the lufthansa object
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// solution
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application for original functions
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// set the object to null and continue to take advantage of partial application through bind
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));

// Challenge: recreating with a function returning a function that does what addVAT does, without using bind

const addVAT2 = function (rate) {
  return value => value + value * rate;
};

console.log(addVAT2(0.23)(100));

/****************************
 * 134. Immediately Invoked Function Expressions (IIFE)
 ***************************/
(function () {
  console.log('This will never run again');
})();

(() => console.log('This also will never run again'))();

/****************************
 * 135. Closures
 ***************************/
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    //updating the variable defined in the parent function
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// After this line, secureBooking execution context will disappear from the stack.
// This also means that passengerCount is no longer in the execution context
const booker = secureBooking();

booker(); // -> 1 passengers
booker(); // -> 2 passengers
booker(); // -> 3 passengers

// passengerCount is correctly updated if it seems not to exist anymore!

// inspecting closure variable environment
console.dir(booker);

/****************************
 * 136. More Closure Examples
 ***************************/

// Example 1
let f; // not yet assigned

const g = function () {
  const a = 23;
  // g can access f, because in its parent scope
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 30;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // -> 46, a exists because of closure
console.dir(f);

// Reassigning f function from h
h();
f(); // -> 60, b exists because of closure
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // defines a callback function
  setTimeout(function () {
    // the callback will be executed after boardPassengers finishes.
    // Nevertheless, it can still access n and perGroup, thanks to closure
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  // this will be executed before the delayed callbak
  console.log(`Will start boarding in ${wait} seconds`);
};

// closed scope hs priority over the scope chain
// the callback still uses perGroup withn the closed scope,
// even if perGroup exists in the global scope
const perGroup = 1000;
boardPassengers(180, 3);

/****************************************************
 * CODING CHALLENGES
 ****************************************************/

/****************************
 * Coding Challenge #1
 ***************************/
/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    !isNaN(answer) && answer <= 3 && answer >= 0 && this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') console.log(this.answers);
    else if (type === 'string')
      console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

/*
 * The code works because the callback brings with it the scope of the parent IIFE function,
 * that contains the header variable. This variable is therefore still accessible from the callback
 * even after the IIFE is completed
 */
