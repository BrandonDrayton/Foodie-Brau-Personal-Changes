const foodParingArray = []

function renderFoodListBeer(beerID) {

    fetch(`https://api.punkapi.com/v2/beers?ids=${beerID}`)
        .then(res => res.json())
        .then(beer => {
            const hopArray = []
            const maltArray = []
            for (i = 0; i < beer[0].food_pairing.length; i++) {
                foodParingArray[i] = beer[0].food_pairing[i]
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
        })

}
const params = new URLSearchParams(window.location.search)
const beerID = params.get("beerid")
renderFoodListBeer(beerID)
console.log(foodParingArray)

// for (i = 0; i < recipe.length && i < 5 )
