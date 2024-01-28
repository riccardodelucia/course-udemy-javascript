'use strict';

/****************************************************
 * 203. Constructor Functions and the new Operator
 ****************************************************/
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this!
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);
console.log(jonas instanceof Person); // true

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

/****************************************************
 * 204. Prototypes
 ****************************************************/
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.prototype);

const jonas = new Person('Jonas', 1991);
jonas.calcAge();

const matilda = new Person('Matilda', 2017);
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// set a property into the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// check if a property is owned from the object or not
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

/****************************************************
 * 206. Prototypal Inheritance on Built-In Objects
 ****************************************************/
console.log(jonas.__proto__.__proto__); // Object prototype
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // Person function

const arr = [3, 4, 5, 6, 7]; // same as new Array
const arr2 = new Array(3, 4, 5, 6, 7);
console.log(arr2);
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__);

// Adding methods to a prototype
// never add methods to built-in objects!!!!!
Array.prototype.unique = function () {
  return [...new Set(this)];
};

const arr3 = [3, 3, 4, 4, 5, 5, 6, 7]; // same as new Array

console.log(arr3.unique());

// Inspecting a DOM object
const h1 = document.querySelector('h1');
console.dir(h1);

// Inspecting a function object prototype chain
console.dir(x => x + 1);

/****************************************************
 * 208. ES6 Classes
 ****************************************************/
// class expression (never used)
// const PersonCl = class{}

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // will be added to PersonCl.prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}
const jessica = new PersonCl('Jessica', 1996);

console.log(jessica);
jessica.calcAge();
console.log(PersonCl);
console.dir(PersonCl.prototype);
console.log(jessica.__proto__ === PersonCl.prototype);

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode

/****************************************************
 * 209. Setters and Getters
 ****************************************************/
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  // just one parameter for setter methods
  set latest(mov) {
    this.movements.push(mov);
  },
};

account.latest = 50;

console.log(account);

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // will be added to PersonCl.prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  // both a property and a method
  get age() {
    return 2037 - this.birthYear;
  }

  // Setting a property that already exists
  set fullName(name) {
    // setting a name for a property that already exists (conflict)
    //if (name.includes(' ')) this.fullName = name;
    //else alert(`${name} is not a full name!`);

    // Convention: when setters try to set properties that already exist,
    // put an _ before the property name in the setter
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);

    // now the setter creates a property _fullName, but fullName no more exists!
  }

  // solution: set fullName from a getter method
  // the property will be computed the first time the fullName will be requested
  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
console.log(jessica.fullName);
console.log(jessica);

const walter = new PersonCl('Walter', 1965);

/****************************************************
 * 210. Static Methods
 ****************************************************/
// 1. static methods in constructor functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.hey = function () {
  console.dir(this); // the function object, NOT THE PROTOTYPE!
  console.log('Hey there!');
};

const jonas = new Person('Jonas', 1991);
Person.hey();
//jonas.hey(); // does not work

// 2. static methods in classes
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // will be added to PersonCl.prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  static hey() {
    console.dir(this); // class PersonCl, NOT THE CURRENT OBJECT!
    console.log('Hey there!');
  }
}

PersonCl.hey();

/****************************************************
 * 211. Object.create
 ****************************************************/
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.calcAge();

console.log(steven.__proto__); // PersonProto

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

/****************************************************
 * 213. Inheritance between "Classes": Constructor Functions
 ****************************************************/
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // calling the parent constructor without the new keyword -> use call()
  // to correctly set this to the current object
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Creating a new Student.prototype object with Person.prototype has its prototype
Student.prototype = Object.create(Person.prototype); // return an empty object, but with correct __proto__ settings
// Do not do the following!!! In this way Student.prototype would become Person.prototype object, with no inheritance
Student.prototype = Person.prototype;

// Each new method added to Student.prototype would then be added to Person.prototype too, violing
// the inheritance principle.

// Add a new methos to Student.prototype
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

// this is wrong, as it points to Person, not to Student
console.dir(Student.prototype.constructor);

// solution
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

/****************************************************
 * 215. Inheritance between "Classes": ES6 Classes
 ****************************************************/
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // will be added to PersonCl.prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  // both a property and a method
  get age() {
    return 2037 - this.birthYear;
  }

  // Setting a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

class StudentCl extends PersonCl {
  // if no constructor method is declared, the parent costructor is automatically inferred and used
  constructor(fullName, birthYear, course) {
    // Always needs to hapen first, since super also defines the this keyword
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Method override
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

/****************************************************
 * 216. Inheritance between "Classes": Object.create
 ****************************************************/
// 1. Create 1st proto as a normal object and define its methods
// this object is automatically linked to the Object proto
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// 2. Create 2nd proto and chain it to first proto
const StudentProto = Object.create(PersonProto);

// populate the new proto with desired methods
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};

// 3. Finally declare the desired object
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

/****************************************************
 * 217. Another Class Example
 ****************************************************/
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.locale;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  deposit(val) {
    this.movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(10000);
acc1.approveLoan(10000); // should not be accessible from the outside

console.log(acc1);

/****************************************************
 * 218. Encapsulation: Protected Properties and Methods
 ****************************************************/
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    this._movements = []; // convention for protected property
    this.locale = navigator.locale;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }

  // protected method
  _approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.getMovements();

console.log(acc1);

/****************************************************
 * 219. Encapsulation: Private Class Fields and Methods
 ****************************************************/
class Account {
  // Public fields
  locale = navigator.language;

  // Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public interfaces
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
    return this;
  }

  // private methods (not yet implementd in modern browsers)
  // #approveLoan(val) {
  //   return true;
  // }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.getMovements();

console.log(acc1);
//console.log(acc1.#movements); // error, now movements is public

/****************************************************
 * CODING CHALLENGES
 ****************************************************/
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed - 5 < 0 ? (this.speed = 0) : (this.speed -= 5);
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
console.log(bmw);
bmw.accelerate();
bmw.brake();

const mercedes = new Car('Mercedes', 95);
console.log(mercedes);
mercedes.accelerate();
mercedes.brake();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  // will be added to PersonCl.prototype
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed - 5 < 0 ? (this.speed = 0) : (this.speed -= 5);
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(mph) {
    this.speed = mph * 1.6;
  }
}

const ford = new Car('Ford', 120);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 60;
console.log(ford);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed - 5 < 0 ? (this.speed = 0) : (this.speed -= 5);
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// Polymorphism
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const electricCar = new EV('Tesla', 120, 23);
console.log(electricCar);
electricCar.chargeBattery(90);
console.log(electricCar.charge);
electricCar.accelerate();
electricCar.brake();

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  // will be added to PersonCl.prototype
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed - 5 < 0 ? (this.speed = 0) : (this.speed -= 5);
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(mph) {
    this.speed = mph * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const electricCar = new EVCl('Rivian', 120, 23);
console.log(electricCar);

electricCar.chargeBattery(90);
electricCar.chargeBattery(100).accelerate().brake().accelerate();

console.log(electricCar.speedUS);
