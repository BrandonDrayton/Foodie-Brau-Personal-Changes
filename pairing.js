
function renderFoodListBeer(beerID) {
    fetch(`https://api.punkapi.com/v2/beers?ids=${beerID}`)
        .then(res => res.json())
        .then(beer => {
            console.log(beer)
            const hopArray = []
            const maltArray = []
            const foodParingArray = []
            if (beer[0].image_url == null) {
                beer[0].image_url = 'https://images.punkapi.com/v2/192.png'
            }
            for (i = 0; i < beer[0].food_pairing.length; i++) {
                foodParingArray[i] = beer[0].food_pairing[i]
                console.log(foodParingArray)
            }
            for (i = 0; i < beer[0].ingredients.malt.length; i++) {
                if (!maltArray.includes(beer[0].ingredients.malt[i].name)) {
                    maltArray.push(`<li class="malt-li-fl">${beer[0].ingredients.malt[i].name} ${beer[0].ingredients.malt[i].amount.value} ${beer[0].ingredients.malt[i].amount.unit}</li>`)
                }
            }
            for (i = 0; i < beer[0].ingredients.hops.length; i++) {
                if (!hopArray.includes(beer[0].ingredients.hops[i].name)) {
                    hopArray.push(`<li class="hops-li-fl">${beer[0].ingredients.hops[i].name} ${beer[0].ingredients.hops[i].amount.value} ${beer[0].ingredients.hops[i].amount.unit}</li>`)
                }
            }
            if (beer[0].image_url == null) {
                beer[0].image_url = 'https://images.punkapi.com/v2/192.png'
            }

            document.querySelector('.clicked-beer-fl').innerHTML =
                `
                <div class="card mb-3 beer-card-rec" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-5 rec-beer-image">
                    <img src="${beer[0].image_url}" class="img-fluid rounded-start beer-image-fl" alt="...">
                  </div>
                  <div class="col-md-7">
                  <div class="card-body clicked-beer-details-fl">
                  <div class="thumbs-up-down-2">
                  <h5 class="card-title beer-name-fl">${beer[0].name}</h5>
                            <a href="#" class="btn tmb-up" data-id=${beer[0].id}>👍</a>  
                            <a href="#" class="btn tmb-down" data-idn=${beer[0].id}>👎</a>
                        </div>
                  <p class="card-text">
                  <div class="abv-ibu-ebc-fl">ABV: ${beer[0].abv}%  <br> IBU: ${beer[0].ibu} <br>  EBC/Color: ${beer[0].ebc} <br>  First Brewed: ${beer[0].first_brewed} </div>
                  <br>
                  <div class="description-fl">${beer[0].description}
                  <br>
                  <div class="hops-malts-fl">

                <ul class="hops-fl"><div class="hops">Hops added to brew kettle:</div>
                <br>
                ${hopArray.join('')}
                </ul>
                <ul class="malt-fl"><div class = "malt">Malt:</div>
                ${maltArray.join('')}
                </ul>
                </div>
                </div>
                </p>
                </div>
                </div>
                </div>
                </div>
                `
            renderRecipes(foodParingArray)
        })

}
function renderRecipes(foodArray) {
    const recipeFetches = []
    for (i = 0; i < foodArray.length; i++) {
        let foodItemHTML = encodeURIComponent(foodArray[i])
        const foodPromise = fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodItemHTML}&app_id=6ece2007&app_key=3c7d449f40731c089916a859042d8c9d`)
            .then(res => res.json())
            .then(food => {
                const recipeCardArray = []
                for (i = 0; i < food.hits.length && i < 5; i++) {
                    recipeCardArray.push(
                        `<div class="card-fl mb-3" style="max-width: 540px;">
                            <div class="card-row-fl row g-0">
                            <div class="card-body-container card-body-col-fl col-md-8">
                            <div class="card-body-fl card-body">
                            <div class="card-img-container-fl col-md-4">
                            <img src="${food.hits[i].recipe.image}" class="card-img-fl img-fluid rounded-start" alt="...">
                            </div>
                            <h5 class="card-title-fl card-title">${food.hits[i].recipe.label}</h5>
                            <div class="card-img-container-fl col-md-4">
                            <img src="${food.hits[i].recipe.image}" class="recipe-image card-img-fl img-fluid rounded-start" alt="...">
                            </div>
                            <a target="_blank" class="card-link-button-fl btn btn-primary btn-large" href="${food.hits[i].recipe.url}" role="button">Get Recipe</a>
                            </div>
                            </div>
                            </div>
                            </div>`)
                }
                return recipeCardArray
            })
        recipeFetches.push(foodPromise)
    }
    Promise.all(recipeFetches).then((results) => {
        const recipeHTML = results.map((result) => result.join('')).join('')
        const recipeResults = document.querySelector('.render-recipes-container-fl')
        recipeResults.innerHTML = recipeHTML
    });
}

let excludedArray = JSON.parse(localStorage.getItem("excludeList")) ?? []
let beerList = JSON.parse(localStorage.getItem("beerList"))
const params = new URLSearchParams(window.location.search)
const beerID = params.get("beerid") ?? getLeftOverId(excludedArray)
renderFoodListBeer(beerID)
console.log(beerID)

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tmb-up')) {
        const beerID = e.target.dataset.id
        console.log(beerID)
        fetch(`https://api.punkapi.com/v2/beers?ids=${beerID}`)
            .then(res => res.json())
            .then(beer => {
                console.log(beer)
                console.log(beerList)
                if (beerList == null) {
                    beerList = []
                    beerList.push(beer[0])
                }
                else beerList.push(beer[0])
                beerListJSON = JSON.stringify(beerList)
                localStorage.setItem('beerList', beerListJSON)
                console.log(beerList)

            })
    }
})

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tmb-down')) {
        const removeRandom = e.target.dataset.idn
        console.log(removeRandom)
        if (!excludeList.includes(removeRandom)) {
            excludeList.push(removeRandom)
        }
        excludeListJSON = JSON.stringify(excludeList)
        localStorage.setItem('excludeList', excludeListJSON)
        window.location.reload(renderFoodListBeer(beerID))
    }
})