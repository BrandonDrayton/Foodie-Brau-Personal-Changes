function renderBeers(beers) {
    const beerArray = beers.map(function (currentBeer) {
        if (currentBeer.image_url == null) {
            currentBeer.image_url = 'https://images.punkapi.com/v2/192.png'
        }
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
                        <a href="#" class="btn removeFromLike-x" data-idx="${currentBeer.id}">❌</a>
                        </div>
                        <h5 class="card-title centered-title">${currentBeer.name}</h5>
                        
                        <p class="card-text">${currentBeer.description}</p>
                    
                    </div>
                </div>
            </div>
        </div>

        `


    });
    const results = document.querySelector('.random-container');
    results.innerHTML = beerArray.join('');
}
let beerListJSON = localStorage.getItem('beerList')
let beerList = JSON.parse(beerListJSON)
renderBeers(beerList)


    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('removeFromLike-x')) {
            const removeFromLike = e.target.dataset.idx
            beerList=beerList.filter(function(beer){
                if (removeFromLike == beer.id){
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


    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('clear-from-liked')) {
            localStorage.clear('beerList')
        }
    })


