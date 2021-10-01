

const jokeInDom = document.getElementById('jokes') as HTMLDivElement;
const generateJokeButton = document.getElementById('generate-joke') as HTMLButtonElement;
const h2 = document.createElement('h2');
const form = document.getElementById('form') as HTMLFormElement;
const bad = document.getElementById('bad') as HTMLButtonElement;
const funny = document.getElementById('funny') as HTMLButtonElement;
const hilarious = document.getElementById('hilarious') as HTMLButtonElement;
const ratingButtons = document.getElementById('rating') as HTMLDivElement;
const weatherIcon = document.getElementById('weather-icon') as HTMLImageElement;
const temperature = document.getElementById('temperature') as HTMLHeadingElement;

interface Acudit {
    joke: string;
    score: number;
    date: string;
  }

let reportAcudits :Acudit[] =  []
let joke: string;


const weatherApiKey: string = "876d8e428d4184ffa9414a76bd35027d";

const displayJoke = (joke: string): void => {
    h2.textContent = null;
    h2.textContent = joke
    jokeInDom?.appendChild(h2)
}

const generateJokeAlt = async ():Promise<string> => {
    const response = await fetch('http://api.icndb.com/jokes/random')
    const json = await response.json()
    joke = json.value.joke
    displayJoke(joke)
    console.log("joke alt=>", joke)
    return joke;
}

const generateJoke = async (): Promise<string> => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
    const json = await response.json()
    joke = json.joke
    displayJoke(joke)
    console.log("joke=>", joke)
    return joke;
}

const pushNewJokeRate = (n:number) : void => {
    reportAcudits.push({
        joke,
        score: n,
        date: new Date().toISOString()
    })
}

const updateRate = (n:number) : void=> {
    const index = reportAcudits.findIndex(item=>item.joke === joke)
    reportAcudits[index].score = n
}

const recordJokeRating = (n:number) : void=>{
    const jokeExists = joke !==undefined
    const jokeIsAlreadyRated = reportAcudits.some(item=> item.joke === joke)
    if (jokeExists) {
        if(jokeIsAlreadyRated) updateRate(n)  
        else pushNewJokeRate(n) 
    }
}

bad.addEventListener('click', (): void=>{
    recordJokeRating(1)
    console.log(reportAcudits)
})

funny.addEventListener('click', (): void=>{
    recordJokeRating(2)
    console.log(reportAcudits)
})

hilarious.addEventListener('click', ():void =>{
    recordJokeRating(3)
    console.log(reportAcudits)
})

const showRating =(): void => {
    if (ratingButtons.className === 'hidden')
        ratingButtons.className = 'visible'  
}

const displayWeather = (weatherImage: string, celsius: string): void=>{
  weatherIcon.src = weatherImage;
  temperature.textContent= celsius
}



const getWeather = async (longitude: number, latitude: number) : Promise<object> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${weatherApiKey}`)

    const weatherData = await response.json()
    console.log('weather data => ', weatherData)
    const weatherImage : string= `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`  
    const celsius :string = Math.floor(weatherData?.main.temp).toString()
    displayWeather(weatherImage, celsius)
    return weatherData
}

const getPosition = (): void=>{
    navigator.geolocation.getCurrentPosition(position => {
        getWeather(position.coords.longitude, position.coords.latitude)
    }
    )}

    const randomJokes = () : void => {
        let evenNumber: boolean;
        evenNumber = Math.floor(Math.random()*100) % 2 ? true: false
        if (evenNumber)generateJoke()
        else generateJokeAlt()    
    }

generateJokeButton.addEventListener('click', (): void => {
    randomJokes()
    showRating()
    getPosition()
})


form.addEventListener('submit', (e : Event) : void => {
    e.preventDefault()
})

window.addEventListener('load', (): void=> {
    getPosition()
})




