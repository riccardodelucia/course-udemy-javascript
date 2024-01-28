'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*****************************************
 * 166. Converting and Checking Numbers
 *****************************************/
console.log(23 === 23.0); // true

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false !!!

// type coercion to number when JS sees the + operator
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px'));

// does not work if the first letter is not a number
console.log(Number.parseInt('e23'));

console.log(Number.parseFloat('2.5rem'));

// isNaN
console.log('isNaN');
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20')); // false
console.log(Number.isNaN(20 / 0)); // false

// isFinite: best way of checking if a value is a number
console.log('isFinite');
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20')); // true
console.log(Number.isFinite(20 / 0)); // false

/*****************************************
 * 167. Math and Rounding
 *****************************************/
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI);

console.log(Math.trunc(Math.random() * 6) + 1);

// Rounding Integers (to the nearest integer)
console.log(Math.round(23.3));
console.log(Math.round(23.9));

// Ceiling
console.log(Math.ceil(23.3));

// Floor
console.log(Math.floor(23.3));

// Trunc and floor differences
console.log(Math.trunc(-23.3)); // 23
console.log(Math.floor(-23.3)); // 24

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// Fixed representation for floating point numbers (decimals)
// surround decimals with () otherwise they get confused with . for calling methods
// boxing occurs to convert primitive decimals to objects and beind able to call toFixed
console.log((2.7).toFixed(0)); // returns a string, not a number
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // convert to number with +

/*****************************************
 * 168. The Remainder Operator
 *****************************************/
console.log(5 % 2);

/*****************************************
 * 169. Working with BigInt
 *****************************************/
// Maximum number represented by JS in 64 bits
// only 53 bits are for the digits, the remaining are for the sign and the decimal part

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(1234567890987654323456789n);

// Operations with BigInt
console.log(10000n + 100n);
//...

// cannot mix BigInt and Number
//console.log(10n + 1); // error
console.log(10n + BigInt(1));

// this instead works
console.log(20n > 15); // true

// equality
console.log(10n === 10); // false (no type coercion)
console.log(10n == 10); // true
console.log(10n == '10'); // true

console.log(typeof 10n);

console.log(10n + ' is a bigint'); // it works!

// cannot use Math. methods
//console.log(Math.sqrt(16n)); // error

// BigInt are always integers
console.log(10n / 3n);

/*****************************************
 * 170. Creating Dates
 *****************************************/

// Create a date
const now = new Date();
console.log(now);

// not safe to pass strings generated by the user
console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));
// note, the month index 10 refers to November.
// JS treats the index as an array index, starting with January = 0
console.log(new Date(2037, 10, 19, 15, 23, 5));

// JS automatically corrects wrong dates
// November has only 30 days
console.log(new Date(2037, 10, 31, 15, 23, 5)); // Tue Dec 01 2037 15:23:05 GMT+0100 (Ora standard dell’Europa centrale)

// milliseconds passed since the UNIX time, which is
// January 1, 1970
console.log(new Date(0)); // script.js:392 Thu Jan 01 1970 01:00:00 GMT+0100 (Ora standard dell’Europa centrale)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after previous date

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // day of the current week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // milliseconds passed from UNIX time

// set methods exist besides get methods...

/*****************************************
 * 172. Operating with Dates
 *****************************************/

const future = new Date(2037, 10, 19, 15, 23);
//console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);

/*****************************************
 * 174. Internationalizing Numbers (Intl)
 *****************************************/
const num = 3884764.23;

console.log('US:  ', new Intl.NumberFormat('en-US').format(num));

console.log('DE:  ', new Intl.NumberFormat('de-DE').format(num));

console.log(
  'Browser:  ',
  new Intl.NumberFormat(navigator.language).format(num)
);

const options = {
  style: 'unit', // percent, currency
  unit: 'celsius', // mile-per-hour
};

console.log(
  'US options:  ',
  new Intl.NumberFormat('en-US', options).format(num)
);

const optionsCurrency = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  useGrouping: true,
};

console.log(
  'US options:  ',
  new Intl.NumberFormat('it-IT', optionsCurrency).format(num)
);

/*****************************************
 * 175. Timers: setTimeout and setInterval
 *****************************************/

// non blocking
// delay expressed in milliseconds
setTimeout(() => console.log('Here is your pizza'), 3000);

console.log('Waiting for pizza');

// passing arguments to timer callback
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);

// a timer can be cleared
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// SET TIME INTERVAL
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
