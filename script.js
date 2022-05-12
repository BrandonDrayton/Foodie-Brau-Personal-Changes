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
        return `
        <div class="card mb-3 beer-card" style="max-width: 540px;">
            <div class="row g-0 card-entire-content">
                <div class="col-md-4">
                    <div class="beer-card-image">
                        <img src="${currentBeer.image_url}"class="img-fluid rounded-start" alt="...">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <br>
                    <div class="thumbs-up-down">
                            <a href="#" class="btn tmb-up" data-id=${currentBeer.id}>👍</a>
                            <a href="#" class="btn tmb-down" data-idn=${currentBeer.id}>👎</a>
                        </div>
                        <h5 class="card-title centered-title">${currentBeer.name}</h5>
                        
                        <p class="card-text">${currentBeer.description}</p>
                    
                    </div>
                </div>
            </div>
        </div>`
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
        window.beers=beers
        console.log(beers)//confirms beers fetched from array numbers
        renderBeers(beers) // renders the returned beers to the .random-container
    })


    // add to like list from thumb up button 
document.addEventListener('click',function(e){
    if(e.target.classList.contains('tmb-up')){
    const beerID = e.target.dataset.id
    console.log(beerID)
    const beer = beers.find((beer) => {
        return beer.id == beerID
    })
    saveToLikeList(beer)
    }
})
function saveToLikeList(beerID) {
    let beerListJSON = localStorage.getItem('beerList')
    let beerList = JSON.parse(beerListJSON)
    if (!beerList) {
        beerList = [] 
    }
    beerList.push(beerID)
    beerListJSON = JSON.stringify(beerList)
    localStorage.setItem('beerList', beerListJSON)
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tmb-down')) {
        const removeRandom = e.target.dataset.idn
        console.log(removeRandom)
        beerList=beerList.filter(function(beer){
            if (removeRandom == beer.id){
                return false
            }
            else {
                return true
            }
            
        })
        beerListJSON = JSON.stringify(beerList)
        localStorage.setItem('beerList', beerListJSON)
        renderBeers(beerList)
    }
})


