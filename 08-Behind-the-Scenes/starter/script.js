'use strict';

/***************************
 * 93. Scoping in Practice
 ***************************/
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  // the function has access to the global variable firstName
  console.log(firstName);

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // Redeclaring a variabile within this scope.
      // This variable will be used instead of 'Jonas', since it exists here.
      // No lookup is therefore performed
      const firstName = 'Steven';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      // Reassigning a variabile from a parent scope
      output = 'NEW OUTPUT'; // now output is 'NEW OUTPUT'
    }

    // Error, str is in an inner block and is not accessible
    // from the outside
    //console.log(str);

    // this works, since millenial is function scoped
    console.log(millenial);

    // add is block scoped (strict mode), therefore
    // is not accessible from outside the if block
    //add(2, 3);
  }

  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);

// Error, age is not accessible from the global scope
//console.log(age);

// Error, printAge() is not accessible from the global scope
//printAge();

/***************************
 * 95. Hoisting and TDZ in practice
 ***************************/
console.log(me); // -> undefined
//console.log(job); // -> ERROR, job is still in the TDZ
//console.log(year); // -> ERROR, year is still in the TDZ

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

console.log(addDecl(2, 3));
// console.log(addExpr(2, 3)); // ERROR, addExpr is still in the TDZ
// console.log(addArrow(2, 3)); // ERROR, addArrow is still in the TDZ
// console.log(addExpr1(2, 3)); // ERROR, addArrow1 is still undefined
// console.log(addArrow1(2, 3)); // ERROR, addArrow2 is still undefined

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

var addExpr1 = function (a, b) {
  return a + b;
};

var addArrow1 = (a, b) => a + b;

// Example
console.log(numProducts);

// numProducts already exists as undefined, i.e. a falsy value.
// The shopping cart is thus deleted although numProducts is intentioned to be 10
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// Window object vs var, const, let
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

/***************************
 * 97. The this keyword in practice
 ***************************/
console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // -> undefined
};

calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // -> window object
};

calcAgeArrow(1980);

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // -> jonas object
    console.log(2037 - this.year);
  },
  greet: () => console.log(`Hey, ${this.firstName}`),
};

jonas.calcAge();
jonas.greet(); // -> 'Hey, undefined'

const matilda = {
  year: 2017,
};

// method borrowing
// never redefine a same method from one object to another, use assignment from one object
matilda.calcAge = jonas.calcAge;
// 'this' points to matilda, even if the method was declared in jonas
matilda.calcAge();

// Note: a variable function points to undefined object
const f = jonas.calcAge;

//f(); // ERROR, this points now to undefined, and undefined.year does not exist

/***************************
 * 98. Regular Functions vs Arrow Functions
 ***************************/
var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // -> jonas object
    console.log(2037 - this.year);

    const isMillenial = function () {
      console.log(this); // undefined, since this is a regular function
      //console.log(this.year >= 1981 && this.year <= 1996); // ERROR, there is no year property for undefined
    };

    const isMillenial2 = () => {
      console.log(this); // jonas, since the arrow funciton inherits this
      console.log(this.year >= 1981 && this.year <= 1996); // now it is working
    };
    isMillenial();
    isMillenial2();
  },
  greet: () => console.log(`Hey, ${this.firstName}`),
};

// greet is an arrow function that points to the window object
// the window object has a property (because of var) called firstName
jonas.greet(); // 'Hey, Matilda'
jonas.calcAge();

// Arguments keyword
const addExpr = function (a, b) {
  console.log(arguments); // prints all arguments actually passed to the function
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments); // ERROR, arguments keyword does not exist for arrow functions
  return a + b;
};

addArrow(2, 5, 8);

/***************************
 * 100. Primitives vs. Objects in Practice
 ***************************/
const Jessica = {
  firsName: 'Jessica',
  lastName: 'Jones',
  age: 27,
  family: ['Alice', 'Bob'],
};

// Shallow copy
// Primitive value properties are succesfully copied
// Referenced values, i.e. objects inside the object, are not deep copied
// family is not duplicated in the new object
const Jessica2 = Object.assign({}, Jessica);
Jessica2.lastName = 'Davis';
console.log(Jessica);
console.log(Jessica2);

console.log(Jessica.family);
Jessica2.family.push('Mary');

// Both Jessica and Jessica2 will contain Mary
console.log(Jessica.family);
console.log(Jessica2.family);
