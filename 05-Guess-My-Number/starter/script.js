'use strict';

/**********************************
 * 
 * Constants and variables
 * 
***********************************/
let number = Math.trunc(Math.random() * 20) + 1;
let score = document.querySelector('.score').textContent;
let highScore = document.querySelector('.highscore').textContent;

// start state variables
const startScore = score;

// start page messages and style
const startNumberFieldContent = document.querySelector('.number').textContent;
const startNumberFieldWidth = document.querySelector('.number').style.width;
const startMessage = document.querySelector('.message').textContent;
const startBodyColor = document.querySelector('body').style.backgroundColor;

/**********************************
 * 
 * Functions
 * 
***********************************/
function validateInput(input) {
    if (!input || input < 1 || input > 20)
        return -1;
    return input;
}


/**********************************
 * 
 * Event Listeners
 * 
***********************************/
document.querySelector('.check').addEventListener('click',
    function () {
        const guess = validateInput(Number(document.querySelector('.guess').value));
        if (guess === -1)
            document.querySelector('.message').textContent = ' ⛔️ Wrong number !';
        else if (guess === number) {
            document.querySelector('.message').textContent = '🎉 Correct Number!';
            document.querySelector('.number').textContent = guess;
            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').style.width = '30rem';
            if (score > highScore) {
                highScore = score;
                document.querySelector('.highscore').textContent = highScore;
            }
        }
        else if (score > 0) {
            document.querySelector('.message').textContent = guess > number ? 'Too high!' : 'Too low!';
            score--;
            document.querySelector('.score').textContent = score;
        }
        else {
            document.querySelector('.message').textContent = '💥 You lost the game';
            document.querySelector('.score').textContent = 0;
        }
    });

document.querySelector('.again').addEventListener('click',
    function () {

        //resetting state variables
        score = startScore;
        number = Math.trunc(Math.random() * 20) + 1;

        //resetting messages
        document.querySelector('body').style.backgroundColor = startBodyColor;
        document.querySelector('.number').textContent = startNumberFieldContent;
        document.querySelector('.number').style.width = startNumberFieldWidth;
        document.querySelector('.message').textContent = startMessage;
        document.querySelector('.score').textContent = startScore;
        document.querySelector('.guess').value = '';
    }
);