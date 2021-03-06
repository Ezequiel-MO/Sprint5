"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jokeInDom = document.getElementById('jokes');
const generateJokeButton = document.getElementById('generate-joke');
const h2 = document.createElement('h2');
const form = document.getElementById('form');
const bad = document.getElementById('bad');
const funny = document.getElementById('funny');
const hilarious = document.getElementById('hilarious');
const ratingButtons = document.getElementById('rating');
let reportAcudits = [];
let joke;
const displayJoke = (joke) => {
    h2.textContent = null;
    h2.textContent = joke;
    jokeInDom === null || jokeInDom === void 0 ? void 0 : jokeInDom.appendChild(h2);
};
const generateJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const json = yield response.json();
    joke = json.joke;
    displayJoke(joke);
    console.log("joke=>", joke);
    return joke;
});
const pushNewJokeRate = (n) => {
    reportAcudits.push({
        joke,
        score: n,
        date: new Date().toISOString()
    });
};
const updateRate = (n) => {
    const index = reportAcudits.findIndex(item => item.joke === joke);
    reportAcudits[index].score = n;
};
const recordJokeRating = (n) => {
    const jokeExists = joke !== undefined;
    const jokeIsAlreadyRated = reportAcudits.some(item => item.joke === joke);
    if (jokeExists) {
        if (jokeIsAlreadyRated)
            updateRate(n);
        else
            pushNewJokeRate(n);
    }
};
bad.addEventListener('click', () => {
    recordJokeRating(1);
    console.log(reportAcudits);
});
funny.addEventListener('click', () => {
    recordJokeRating(2);
    console.log(reportAcudits);
});
hilarious.addEventListener('click', () => {
    recordJokeRating(3);
    console.log(reportAcudits);
});
const showRating = () => {
    if (ratingButtons.className === 'hidden')
        ratingButtons.className = 'visible';
};
generateJokeButton.addEventListener('click', () => {
    generateJoke();
    showRating();
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
