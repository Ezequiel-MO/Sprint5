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
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
let reportAcudits = [];
let joke;
const weatherApiKey = "876d8e428d4184ffa9414a76bd35027d";
const displayJoke = (joke) => {
    h2.textContent = null;
    h2.textContent = joke;
    jokeInDom === null || jokeInDom === void 0 ? void 0 : jokeInDom.appendChild(h2);
};
const generateJokeAlt = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://api.icndb.com/jokes/random');
    const json = yield response.json();
    joke = json.value.joke;
    displayJoke(joke);
    console.log("joke alt=>", joke);
    return joke;
});
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
const displayWeather = (weatherImage, celsius) => {
    weatherIcon.src = weatherImage;
    temperature.textContent = celsius;
};
const getWeather = (longitude, latitude) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${weatherApiKey}`);
    const weatherData = yield response.json();
    console.log('weather data => ', weatherData);
    const weatherImage = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    const celsius = Math.floor(weatherData === null || weatherData === void 0 ? void 0 : weatherData.main.temp).toString();
    displayWeather(weatherImage, celsius);
    return weatherData;
});
const getPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
        getWeather(position.coords.longitude, position.coords.latitude);
    });
};
const randomJokes = () => {
    let evenNumber;
    evenNumber = Math.floor(Math.random() * 100) % 2 ? true : false;
    if (evenNumber)
        generateJoke();
    else
        generateJokeAlt();
};
generateJokeButton.addEventListener('click', () => {
    randomJokes();
    showRating();
    getPosition();
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
window.addEventListener('load', () => {
    getPosition();
});
