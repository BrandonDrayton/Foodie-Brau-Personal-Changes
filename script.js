fetch(`https://api.punkapi.com/v2/beers?{}`)
render beers function
function renderBeers(beers) {
    const beerArray = beers.map((currentBeer) => {
        return `
        <div class="card mb-3 beer-card" style="max-width: 540px;">
            <div class="row g-0 card-entire-content">
                <div class="col-md-6">
                    <div class="beer-card-image">
                        <img src="${currentBeer.image_url}"class="img-fluid rounded-start" alt="...">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title centered-title">${currentBeer.name}</h5>
                        <div class="thumbs-up-down">
                            <a href="#" class="btn tmb-up">👍</a>
                            <a href="#" class="btn tmb-down">👎</a>
                        </div>
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
        console.log(beers)//confirms beers fetched from array numbers
        renderBeers(beers) // renders the returned beers to the .random-container
    })

