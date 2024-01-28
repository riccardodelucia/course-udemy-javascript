/************************
 * 266. Exporting and Importing in ES6 Modules
 ************************/

// Importing module
import './shoppingCart.js';

import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

console.log(price, tq);

// importing all is like creating a namespace for the imported module
import * as ShoppingCart from './shoppingCart.js';

console.log('Importing module');

ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

// importing default with custom name
import add from './shoppingCart';
add('pizza', 2);

/************************
 * 267. The Module Pattern
 ************************/

/* const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCart = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addTocart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addTocart('apple', 4);
ShoppingCart2.addTocart('pizza', 2);

// cannot log private variables
console.log(ShoppingCart2); */

/************************
 * 270. Introduction to NPM
 ************************/
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

console.log(stateClone);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);
console.log(stateDeepClone);
