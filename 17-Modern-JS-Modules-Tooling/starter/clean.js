/***************
 * OLD CODE
 ***************/
/* var sc = [
  { product: 'bread', quantity: 6 },
  { product: 'pizza', quantity: 2 },
  { product: 'milk', quantity: 4 },
  { product: 'water', quantity: 10 },
];

var allow = {
  lisbon: 5,
  others: 7,
};

var description = '';

var check = function (city) {
  if (sc.length > 0) {
    var allowed;
    if (city == 'lisbon') {
      allowed = allow.lisbon;
    } else {
      allowed = allow.others;
    }

    for (item of sc) {
      if (item.quantity > allowed) item.quantity = allowed;
    }
  }
};
check('lisbon');
console.log(sc);

var createDescription = function () {
  var first = sc[0];
  var p = first.product;
  var q = first.quantity;

  if (sc.length > 1) {
    description = 'Order with ' + q + ' ' + p + ', etc...';
  } else {
    description = 'Order with ' + q + ' ' + p + '.';
  }
};
createDescription();

console.log(description); */
/////////////////////////////////////////////////////////////////////////////////////////
/***************
 * NEW AND CLEANED CODE
 ***************/

// var sc = [
//   { product: 'bread', quantity: 6 },
//   { product: 'pizza', quantity: 2 },
//   { product: 'milk', quantity: 4 },
//   { product: 'water', quantity: 10 },
// ];
const shoppingCart = [
  { product: 'bread', quantity: 6 },
  { product: 'pizza', quantity: 2 },
  { product: 'milk', quantity: 4 },
  { product: 'water', quantity: 10 },
];

// var allow = {
//   lisbon: 5,
//   others: 7,
// };
const allowedProducts = {
  lisbon: 5,
  others: 7,
};

//var description = '';
// let orderDescription = '';

// This function needs to return a new shoppingCart object
// var check = function (city) {
//   if (sc.length > 0) {
//     var allowed;
//     if (city == 'lisbon') {
//       allowed = allow.lisbon;
//     } else {
//       allowed = allow.others;
//     }

//     for (item of sc) {
//       if (item.quantity > allowed) item.quantity = allowed;
//     }
//   }
// };
const checkCorrectAllowedProducts = function (cart, numAllowed, city) {
  // Guard clause
  if (!cart.length) return [];

  //const allowed = numAllowed[city] > 0 ? numAllowed[city] : numAllowed.others;
  const allowed = numAllowed?.[city] ?? allowedProducts.others;

  const newCart = cart.map(item => {
    const { product, quantity } = item;
    return { product, quantity: quantity > allowed ? allowed : quantity };
  });

  return newCart;
};

//check('lisbon');
const allowedShoppingCart = checkCorrectAllowedProducts(
  shoppingCart,
  allowedProducts,
  'lisbon'
);

//console.log(sc);
console.log(allowedShoppingCart);

// var createDescription = function () {
//   var first = sc[0];
//   var p = first.product;
//   var q = first.quantity;

//   if (sc.length > 1) {
//     description = 'Order with ' + q + ' ' + p + ', etc...';
//   } else {
//     description = 'Order with ' + q + ' ' + p + '.';
//   }
// };
const createOrderDescription = function (cart) {
  const [{ product: p, quantity: q }] = cart;

  return `Order with ${q} ${p}${cart.length > 1 ? ', etc...' : '.'}`;
};

// createDescription();
const orderDescription = createOrderDescription(allowedShoppingCart);

// console.log(description);
console.log(orderDescription);
