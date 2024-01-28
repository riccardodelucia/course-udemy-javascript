'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
          </div>
      </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
///////////////////////////////////////

/*************************************
 * 242. Our First AJAX Call: XMLHttpRequest
 *************************************/
// old school AJAX
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });

  request.send();
};

getCountryData('italy');
getCountryData('usa');
getCountryData('germany');

/*************************************
 * 244. Welcome to Callback Hell
 *************************************/

const getCountryAndNeighbour = function (country) {
  // AJAX Call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country
    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('usa');

//callback hell example 2
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

/*************************************
 * 245. Promises and the Fetch API
 *************************************/
// modern way of making AJAX calls

const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
console.log(request); // a promise is sored in request variable

/*************************************
 * 246. Consuming Promises
 *************************************/
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//     });
// };

// simplifying the code. Note how then are now beautifully chained
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('portugal');

/*************************************
 * 247. Chaining Promises
 *************************************/
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

getCountryData('portugal');

/*************************************
 * 248. Handling Rejected Promises
 *************************************/
// 1st strategy, fetch accepts a second callback for error handling
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(
//       response => response.json(),
//       err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(
//       response => response.json(),
//       err => alert(err)
//     )
//     .then(data => renderCountry(data, 'neighbour'));
// };

// 2nd strategy (more elegant): manage all possible errors in one place with catch method
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('adadadada');

/*************************************
 * 249. Throwing Errors Manually
 *************************************/
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country not found`
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('adadadada');

/*************************************
 * 252. The Event Loop in Practice
 *************************************/
// console.log('Test start');
// setTimeout(() => consolelog('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // executed before timer callback
// console.log('Test end');

// Test start
// Test end
// Resolved Promise 1
// 0 sec timer

console.log('Test start');
setTimeout(() => consolelog('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // executed before timer callback
Promise.resolve('Resolved promise 2').then(res => {
  // simulate a long time execution task
  for (let i = 0; i > 10000000000000000000; i++) console.log(res);
});
console.log('Test end');

// Test start
// Test end
// Resolved Promise 1
// Resolved Promise 2
// 0 sec timer

/*************************************
 * 253. Building a Simple Promise
 *************************************/
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() > 0.5) {
      resolve('You win!');
    } else {
      reject(new Error('You lost your money'));
    }
  });
});

lotteryPromise.then(res => console.log(res)).catch(err => console.err(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// solving a callback hell
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait();
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait();
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait();
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait();
  })
  .then(() => console.log('I waited for 1 seconds'));

// compare with
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// returning an immediately resolved/ rejected promise
Promise.resolve('You win').then(res => console.log(res));
Promise.reject(new Error('Error')).then(err => console.error(err));

/*************************************
 * 254. Promisifying the Geolocation API
 *************************************/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // resolve and reject automatically receive the output from getCurrentPosition as input to their functions
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))

    .catch(err => {
      console.error(`${err.message}`);
    });
};
btn.addEventListener('click', whereAmI);

// const whereAmI = function (lat, lng) {
//   const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;
//   fetch(url)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found! (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))

//     .catch(err => {
//       console.error(`${err.message}`);
//     });
// };

/*************************************
 * 256. Consuming Promises with Async/Await
 *************************************/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  // stop the code until this promise is fullfilled
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

  const dataGeo = await resGeo.json();

  const res = await fetch(
    `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
  );
  // same as
  // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
  //   console.log(res)
  // );

  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
whereAmI();
console.log('FIRST');

/*************************************
 * 257. Error Handling With try...catch
 *************************************/
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    // stop the code until this promise is fullfilled
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    // same as
    // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
    //   console.log(res)
    // );

    if (!res.ok) throw new Error('Problem getting country data');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);
  }
};
whereAmI();
whereAmI();
whereAmI();
whereAmI();

console.log('FIRST');

/*************************************
 * 258. Returning Values from Async Functions
 *************************************/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
let cityStr;
const whereAmI = async function () {
  try {
    // stop the code until this promise is fullfilled
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error('Problem getting country data');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(`${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');

// never assign to a global variable from an async function
//const city = whereAmI(); // returns a promise, not the value
//const city = await whereAmI(); // does not work!

// basic use
// whereAmI()
//   .then(city => {
//     console.log(`2: ${city}`);
//     cityStr = city;
//     console.log(cityStr);
//   })
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// a better use
// const testFn = async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//     cityStr = city;
//     console.log(cityStr);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log('3: Finished getting location');
// };

// testFn();

// an even better use, with IIFE (no need for function variables and calling them)
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
    cityStr = city;
    console.log(cityStr);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();

/*************************************
 * 259. Running Promises in Parallel
 *************************************/

const get3Countries = async function (c1, c2, c3) {
  try {
    // in this way, these independent AJAX calls are not executed in parallel
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    console.log(data.flat().map(item => item.capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

/*************************************
 * 260. Other Promise Combinators: race, allSettled, any
 *************************************/

// 1. Promise.race
// It settles a promise as soon as one of the promise from the async functions is returned (valid or invalid)
// The final promise is the one from the function that won the race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/maxico`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
  ]);
  console.log(res[0]);
})();

// An example of request race against a timer
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    });
  }, sec);
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/italy`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// 2. Promise.allSettled [ES2020]
Promise.allSettled([
  Promise.resolve('Succes'),
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Succes'),
]).then(res => console.log(res));

// 3. Promise.any [ES2021]
Promise.any([
  Promise.resolve('Succes'),
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Succes'),
]).then(res => console.log(res));

/*************************************
 * CODING CHALLENGES
 *************************************/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const whereAmI = function (lat, lng) {
  const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;
  fetch(url)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))

    .catch(err => {
      console.error(`${err.message}`);
    });
};

whereAmI(-33.933, 18.474);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgs = document.querySelector('.images');

let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', e => {
      imgs.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', err => {
      reject(new Error('Image not found'));
    });
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => (currentImg.style.display = 'none'))
  .catch(err => console.error(err));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgs = document.querySelector('.images');

let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.addEventListener('load', e => {
      imgs.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', err => {
      reject(new Error('Image not found'));
    });
    img.src = imgPath;
  });
};

const loadNPause = async function () {
  try {
    const img1 = await createImage('img/img-1.jpg');

    await wait(2);

    img1.style.display = 'none';

    const img2 = await createImage('img/img-2.jpg');

    await wait(2);

    img2.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

const myFun = async function(){
    console.log("Before")
    const a = await Promise.resolve(2)
    console.log("after")
}

myFun();
console.log("when?")

//loadNPause();

const loadAll = async function (imgArr) {
  try {
    // returns promises istead of loaded images
    // const imgs = imgArr.map(item => createImage(item));

    // returns again promises istead of loaded images, despite the await keyword
    // an async method ALWAYS return a promise
    const imgs = imgArr.map(async item => await createImage(item));

    console.log(imgs);

    // solution: use Promise.all
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach(item => item.classList.add('paralell'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
