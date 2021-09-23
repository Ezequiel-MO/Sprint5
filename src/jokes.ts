

const generateJoke = async () :Promise<string> => {
   const response = await fetch('https://icanhazdadjoke.com/', {
       headers: {
           'Accept': 'application/json'
       }
   })
   const json = await response.json()
   const joke = json.joke
   console.log("joke=>", joke)
   return joke;
}




