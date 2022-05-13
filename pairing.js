
function renderFoodListBeer(beerID) {
    fetch(`https://api.punkapi.com/v2/beers?ids=${beerID}`)
        .then(res => res.json())
        .then(beer => {
            console.log(beer)
            const hopArray = []
            const maltArray = []
            const foodParingArray = []
            for (i = 0; i < beer[0].food_pairing.length; i++) {
                foodParingArray[i] = beer[0].food_pairing[i]
                console.log(foodParingArray)
            }
            for (i = 0; i < beer[0].ingredients.malt.length; i++) {
                if (!maltArray.includes(beer[0].ingredients.malt[i].name)) {
                    maltArray.push(`<li class="malt-li-fl">${beer[0].ingredients.malt[i].name}</li>`)
                }
            }
            for (i = 0; i < beer[0].ingredients.hops.length; i++) {
                if (!hopArray.includes(beer[0].ingredients.hops[i].name)) {
                    hopArray.push(`<li class="hops-li-fl">${beer[0].ingredients.hops[i].name}</li>`)
                }
            }
            document.querySelector('.clicked-beer-fl').innerHTML =
                `<div class="beer-image-fl">
            <img src="${beer[0].image_url}">
        </div>
        <div class="clicked-beer-details-fl">
            <div class="beer-name-fl">${beer[0].name}</div>
            <div class="abv-ibu-ebc-fl">ABV:${beer[0].abv}   IBU:${beer[0].ibu}   EBC/Color:${beer[0].ebc}   First Brewed:${beer[0].first_brewed} </div>
            <div class="description-fl">${beer[0].description}
            <div class="hops-malts-fl">
                <ul class="hops-fl">Hops
                ${hopArray.join('')}
                </ul>
                <ul class="malt-fl">Malt
                ${maltArray.join('')}
                </ul>
            </div>
        </div>`
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
                        `<div class="card mb-3" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${food.hits[i].recipe.image}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${food.hits[i].recipe.label}</h5>
                                        <a target="_blank" class="btn btn-primary btn-large" href="${food.hits[i].recipe.url}" role="button">Get Recipe</a>
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
const params = new URLSearchParams(window.location.search)
const beerID = params.get("beerid") ?? getLeftOverId(excludedArray)
renderFoodListBeer(beerID)





