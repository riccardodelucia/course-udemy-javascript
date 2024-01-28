// 'use strict'

let hasDriversLicense = false;
const passTest = true;

if (passtest) hasDriverLicense = true;
if (hasDriversLicense) console.log("I can drive!");

const yearsUntilRetirement = (birthYear) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return retirement;
};

console.log(yearsUntilRetirement(1991));

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement("Jonas", 1991));

// /****************************/
const years = [1991, 1992, 1993];
const years = new Array(1991, 1992, 1993);

/****************************/
const friends = ["Michael", "Steven", "Peter"];

// ADD ELEMENTS
// add element to the end of the array
const newLength = friends.push("Jay"); // returns the new length of the array

// add element on top of the array
const newLength = friens.unshift("John"); // returns the new length of the array

// REMOVE ELEMENTS
const popped = friends.pop(); // returns the element extracted from the array's tail
const shifted = friends.shift(); // returns the element extracted from the array's top

const foundIndex = friends.indexOf("Steven"); // returns the index of the found elements, -1 otherwise

const isIncluded = friends.includes("Steven"); // returns true if the element is found in the array through strict equality (no type coercion)

/******************************/
const myObject = {
  firstName: "Riccardo",
  lastName: "De Lucia",
};

console.log(myObject.firstName);
console.log(myObject["firstName"]);

const nameKey = "Name";

console.log(myObject["first" + nameKey]);

const interestedIn = prompt("What do you want to see (firstName, lastName)?");
console.log(myObject[interestedIn]);

//new property
myObject.age = 29;
console.log(myObject.age);

/*************** */
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  // calcAge: function (birthYear){
  //     return 2037-birthYear;
  // }
  calcAge: function () {
    return 2037 - this.birthYear;
  },
};

console.log(
  `Jonas has ${jonas.friends.length} friends, and his best friend is ${jonas.friends[0]}`
);

debugger;

console.log(jonas.calcAge());
console.log(jonas["calcAge"]());
