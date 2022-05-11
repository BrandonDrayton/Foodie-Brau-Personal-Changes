// function for submit button
const selectForm = document.querySelector("#select-form");
selectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const abv = document.querySelector("#abv-select").value
    const abvSelect = abv.replaceAll("-", "")
    if (abvselect[0] = 0) {
    }
    const ibuSelect = document.querySelector("#ibu-select").value
    const colorSelector = document.querySelector("#color-select").value
    const selectorString = (`${abvSelect}&${ibuSelect}&${colorSelector}`)
    console.log(selectorString)
})
// abv_gt
// abv_lt
// ibu_gt
// ibu_lt
// fetch(`https://api.punkapi.com/v2/beers?{}`)
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
