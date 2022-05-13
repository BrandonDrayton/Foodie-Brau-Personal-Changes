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
            let beerListJSON = localStorage.getItem('beerList')
            let beerList = JSON.parse(beerListJSON)

            let excludeList = JSON.parse(localStorage.getItem('excludeList'))
            searchForm.reset()
            // console.log(beers)
            // console.log(excludeList)
            // let result = beers.filter((beer) => excludeList.includes(beer))
            // console.log(result)
            renderBeers(beers)

        })
})
