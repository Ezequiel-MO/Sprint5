

const jokeInDom = document.getElementById('jokes') as HTMLDivElement;
const generateJokeButton = document.getElementById('generate-joke') as HTMLButtonElement;
const h2 = document.createElement('h2');
const form = document.getElementById('form') as HTMLFormElement;
const bad = document.getElementById('bad') as HTMLButtonElement;
const funny = document.getElementById('funny') as HTMLButtonElement;
const hilarious = document.getElementById('hilarious') as HTMLButtonElement;
const ratingButtons = document.getElementById('rating') as HTMLDivElement;


interface Acudit {
    joke: string;
    score: number;
    date: string;
  }

let reportAcudits :Acudit[] =  []
let joke: string;



const displayJoke = (joke: string): void => {
    h2.textContent = null;
    h2.textContent = joke
    jokeInDom?.appendChild(h2)

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

generateJokeButton.addEventListener('click', (): void => {
    generateJoke()
    showRating()
})


form.addEventListener('submit', (e : Event) : void => {
    e.preventDefault()
})




