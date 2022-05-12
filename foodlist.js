const foodParingArray = []
function renderFoodListBeer(beerID) {
    fetch(`https://api.punkapi.com/v2/beers?ids=${beerID}`)
        .then(res => res.json())
        .then(beer => {
            for (i = 0; i < beer[0].food_pairing.length; i++) {
                foodParingArray[i] = beer[0].food_pairing[i]
                console.log(foodParingArray)
            }

        })
}
renderFoodListBeer('33')