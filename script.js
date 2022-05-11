const selectForm = document.querySelector("#select-form");
selectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const abvSelect = document.querySelector("#abv-select").value
    abvSelect.remove("-")
    console.log(abvSelect)
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