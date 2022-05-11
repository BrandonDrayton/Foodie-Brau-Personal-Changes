// render beers function
function renderBeers(beers) {
    const beerArray = beers.map((currentBeer) => {
        return ``//input html layout
    });
    const results = document.querySelector('.random-container');
    results.innerHTML = beerArray.join('');
}
//creates 6 random numbers between 1-325 for initial random fetch
const randomArray = []
for (let i = 0; i < 6; i++) {
    randomArray[i] = Math.floor(Math.random() * 325) + 1
}

fetch(`https://api.punkapi.com/v2/beers?ids=${randomArray.join('|')}`)
    .then(res => res.json())
    .then(beers => {
        console.log(beers)//confirms beers fetched from array numbers
        // renderBeers(beers) // renders the returned beers to the .random-container
    })