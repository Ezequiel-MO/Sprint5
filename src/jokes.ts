
const jokeInDom = document.getElementById('jokes') as HTMLDivElement;
const button = document.getElementById('generate-joke') as HTMLButtonElement;
const h2 = document.createElement('h2')




const displayJoke = (joke : string):  void => {
    h2.textContent = null;
    h2.textContent = joke
    jokeInDom?.appendChild(h2)
    
}

const generateJoke = async () :Promise<string> => {
   const response = await fetch('https://icanhazdadjoke.com/', {
       headers: {
           'Accept': 'application/json'
       }
   })
   const json = await response.json()
   const joke = json.joke
   displayJoke(joke)
   console.log("joke=>", joke)
   return joke;
}


button.addEventListener('click', ()=>{
    generateJoke()
})




