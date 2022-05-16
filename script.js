
let excludeList = JSON.parse(localStorage.getItem('excludeList')) ?? []
// function for submit button
const selectForm = document.querySelector("#select-form");
selectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // all variables needed for submit button
    const abv = document.querySelector("#abv-select").value
    const ibu = document.querySelector("#ibu-select").value
    const ebc = document.querySelector("#color-select").value
    // Three different functions for optional matches
    function abvSelector(abv) {
        if (abv == "0-5") return [0, 5]
        else if (abv == "5-8") return [5, 8]
        else if (abv == "8-12") return [8, 12]
        else if (abv == "12") return [12, 100]
        else return [0, 100]
    }
    function ibuSelector(ibu) {
        if (ibu == "0-25") return [1, 25]
        else if (ibu == "25-50") return [25, 50]
        else if (ibu == "50-100") return [50, 100]
        else if (ibu == "100") return [100, 1000]
        else return [0, 1000]
    } function ebcSelector(ebc) {
        if (ebc == "0-12") return [1, 12]
        else if (ebc == "12-26") return [12, 26]
        else if (ebc == "26-40") return [26, 40]
        else if (ebc == "40") return [40, 1000]
        else return [0, 1000]
    }
    const abv_gt = abvSelector(abv)[0]
    const abv_lt = abvSelector(abv)[1]
    const ibu_gt = ibuSelector(ibu)[0]
    const ibu_lt = ibuSelector(ibu)[1]
    const ebc_gt = ebcSelector(ebc)[0]
    const ebc_lt = ebcSelector(ebc)[1]

    const selectorString = (`https://api.punkapi.com/v2/beers?=abv_gt=${abv_gt}&abv_lt=${abv_lt}&ibu_gt=${ibu_gt}&ibu_lt=${ibu_lt}&ebc_gt=${ebc_gt}&ebc_lt=${ebc_lt}`)
    fetch(`https://api.punkapi.com/v2/beers?=${selectorString}`)
        .then(response => response.json())
        .then(beers => {
            window.beers = beers
            console.log(beers)
            renderBeers(beers)
        })
})

const newHeader = document.querySelector('.random-pull')

const searchForm = document.querySelector('#search-form')
searchForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const searchString = document.querySelector('#search-bar').value
    const urlEncodedSearchString = encodeURIComponent(searchString)
    newHeader.innerText = `Here's your Beers!!`
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${urlEncodedSearchString}`)
        .then(response => response.json())
        .then(beers => {
            window.beers = beers
            let excludeList = JSON.parse(localStorage.getItem('excludeList'))
            searchForm.reset()
            console.log(beers)
            console.log(excludeList)
            if (excludeList === null) {
                excludeList = []
            }
            let result = beers.filter((beer) => !excludeList.includes(beer.id.toString()))
            renderBeers(result)
        })
})

function renderBeers(beers) {
    const beerArray = beers.map((currentBeer) => {
        if (currentBeer.image_url == null) {
            currentBeer.image_url = 'https://images.punkapi.com/v2/192.png'
        }
        return `
        <div class="card mb-3 beer-card" style="max-width: 540px; background-color: #2E9CCA" id="beer-card-${currentBeer.id}">
            <div class="row g-0 card-entire-content">
                <div class="col-md-4">
                    <div class="beer-card-image" id="beer-card-img">
                        <img src="${currentBeer.image_url}"class="img-fluid rounded-start" alt="...">
                    </div>
                </div>
                <div class="col-md-8 background-color:whitesmoke">
                    <div class="card-body card-body-landing">
                    <div class="button-container">
                    <a href="./pairing.html?beerid=${currentBeer.id}" class="btn btn-primary pair-with" data-pairwith=${currentBeer.id}> Pairs With</a>
                    <div class="thumbs">    
                            <a href="javascript:void()" class="btn tmb-up" data-id=${currentBeer.id}>👍</a>  
                            <a href="#" class="btn tmb-down" data-idn=${currentBeer.id}>👎</a>
                            </div>
                        </div>
                        <br>
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
function getLeftOverId(excludeArray) {
    const max = 325
    const num = Math.floor(Math.random() * max) + 1
    if (excludeArray.length >= max) {
        return 0
    }
    if (excludeArray.includes(num.toString())) {
        return getLeftOverId(excludeArray)
    } else {
        return num
    }
}

const randomArray = []
for (let i = 0; i < 6; i++) {
    randomArray[i] = getLeftOverId(randomArray.concat(excludeList))

}

fetch(`https://api.punkapi.com/v2/beers?ids=${randomArray.join('|')}`)
    .then(res => res.json())
    .then(beers => {
        window.beers = beers
        renderBeers(beers) // renders the returned beers to the .random-container

    })


// add to like list from thumb up button 
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tmb-up')) {
        const beerID = e.target.dataset.id
        console.log(beerID)
        const beer = beers.find((beer) => {
            console.log(beerID)
            return beer.id == beerID
        })
        saveToLikeList(beer)
    }
})





