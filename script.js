
let excludeList = JSON.parse(localStorage.getItem('excludeList')) ?? []


function renderBeers(beers) {
    const beerArray = beers.map((currentBeer) => {
        if (currentBeer.image_url == null) {
            currentBeer.image_url = 'https://images.punkapi.com/v2/192.png'
        }
        return `
        <div class="card mb-3 beer-card" style="max-width: 540px;" id="beer-card-${currentBeer.id}">
            <div class="row g-0 card-entire-content">
                <div class="col-md-4">
                    <div class="beer-card-image" >
                        <img src="${currentBeer.image_url}"class="img-fluid rounded-start" alt="...">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <a href="./pairing.html?beerid=${currentBeer.id}" class="btn btn-primary pair-with" data-pairwith=${currentBeer.id}> Pairs With</a>
                    <div class="thumbs-up-down">
                            <a href="#" class="btn tmb-up" data-id=${currentBeer.id}>👍</a>  
                            <a href="#" class="btn tmb-down" data-idn=${currentBeer.id}>👎</a>
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

//creates 6 random numbers between 1-325 for initial random fetch
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
            return beer.id == beerID
        })

        console.log(beerID)
        saveToLikeList(beer)
    }
})

function saveToLikeList(beerID) {
    let beerListJSON = localStorage.getItem('beerList')
    let beerList = JSON.parse(beerListJSON)
    if (!beerList) {
        beerList = []
    }
    for (let i = beerList.length; i--;) {
        if (beerList[i] === null) beerList.splice(i, 1)
    }
    beerList.push(beerID)
    beerListJSON = JSON.stringify(beerList)
    localStorage.setItem('beerList', beerListJSON)
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tmb-down')) {
        const removeRandom = e.target.dataset.idn
        console.log(removeRandom)
        if (!excludeList.includes(removeRandom)) {
            excludeList.push(removeRandom)
        }
        console.log(excludeList)
        excludeListJSON = JSON.stringify(excludeList)
        localStorage.setItem('excludeList', excludeListJSON)
        document.querySelector(`#beer-card-${removeRandom}`).remove()

    }
})



