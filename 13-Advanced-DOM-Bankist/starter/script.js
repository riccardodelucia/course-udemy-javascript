'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// LECTURES

/********************************************
 * 181. Selecting, Creating and Deleting Elements
 ********************************************/

// 1. SELECTING ELEMENTS
// Simple Selections for fundamental elements
// selecting the entire document
// Note: document is NOT the document element, use
//document.documentElement
console.log(document.documentElement);
console.log(document.body);
console.log(document.head);

// Selecting non fundamental elements
const header = document.querySelector('.header');

// NodeList data
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

// HTMLCollection data
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
// selecting elements of a specified class.
console.log(document.getElementsByClassName('btn'));

// 2. CREATING AND INSERTING ELEMENTS

//not yet in the DOM!
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie"> Got it!</button>';
header.append(message);
// header.prepend(message); // now the element is here

// if we want the element both on top and bottom
//header.append(message.cloneNode(true));

//header.after(message);
header.before(message);

header.insertAdjacentElement('beforeend', message);

// 3. DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

/********************************************
 * 182. Styles, Attributes and Classes
 ********************************************/

// 1. STYLES
// inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// cannot directly read styles only defined in the style sheet
// or added from the browser
console.log(message.style.height);
//solution
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// 2. ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); // instead of class

// Non-standard attribute
// will not be read
console.log(logo.designer);
// solution
console.log(logo.getAttribute('designer'));

// Setting standard attributes
logo.alt = 'Beautiful minimalist logo';

// Setting non-standard attributes
logo.setAttribute('company', 'Bankist');

// src difference between absolute and relative URL version
console.log(logo.src); // absolute
console.log(logo.getAttribute('src')); // relative

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// 3. CLASSES
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use!!!!!
// Will overwrite all classes and force to just one class for the current element
logo.className = 'jonas';

/********************************************
 * 184. Types of Events and Event Handlers
 ********************************************/

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading');

  // removing the event once occurred
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// old school way. Just use always addEventListener
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading');
// };

// remove the event after a time has passed
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

/********************************************
 * 186. Event Propagation in Practice
 ********************************************/
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  console.log(e.currentTarget === this); // always true

  // e. stop propagation
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true
);

/********************************************
 * 188. DOM Traversing
 ********************************************/
const h1 = document.querySelector('h1');

// 1. Going downwards: child
console.log(h1.querySelectorAll('.highlight'));

// Retrieve ALL immediately children elements in the DOM.
// Includes text, comment, etc. nodes
console.log(h1.childNodes);

// Retrieve only element immediately children nodes in the DOM.
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// 2. Going upwards (selecting parents)

// could also be a non element node
console.log(h1.parentNode);

// is an element node
console.log(h1.parentElement);

// select the closest parent that has the specified class
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// . Going sideways: selecting siblings
// select element nodes only
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// select any kind of valid node
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// selecting ALL siblings of a node
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

/********************************************
 * 197. Lifecycle DOM Events
 ********************************************/
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
