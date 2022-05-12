// function for submit button
const selectForm = document.querySelector("#select-form");
selectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // all variables needed for submit button
    const abvSelect = document.querySelector("#abv-select").value
    const abvFalse = abvSelect.replaceAll("-", "")
    const abv = abvFalse.replaceAll("+", "")
    const ibuSelect = document.querySelector("#ibu-select").value
    const ibuFalse = ibuSelect.replaceAll("-", "")
    const ibu = ibuFalse.replaceAll("+", "")
    const colorSelect = document.querySelector("#color-select").value
    const ebcFalse = colorSelect.replaceAll("-", "")
    const ebc = ebcFalse.replaceAll("+", "")
    // Three different functions for optional matches
    function abvSelector(abv) {
        let values = []
        if (abv == 05) {
            values.push(0, 5)
            return values
        }
        else if (abv == 58) {
            values.push(5, 8)
            return values
        } else if (abv == 812) {
            values.push(8, 12)
            return values
        } else if (abv == 12) {
            values.push(12, 100)
            return values
        }
    }
    function ibuSelector(ibu) {
        let values = []
        if (ibu == 025) {
            values.push(0, 25)
            return values
        }
        else if (ibu == 2550) {
            values.push(25, 50)
            return values
        } else if (ibu == 50100) {
            values.push(50, 100)
            return values
        } else if (ibu == 100) {
            values.push(100, 1000)
            return values
        }
    } function ebcSelector(ebc) {
        let values = []
        if (ebc == 012) {
            values.push(0, 12)
            return values
        }
        else if (ebc == 1226) {
            values.push(12, 26)
            return values
        } else if (ebc == 2640) {
            values.push(26, 40)
            return values
        } else if (ebc == 40) {
            values.push(40, 1000)
            return values
        }
    }
    const abv_gt = abvSelector(abv)[0]
    const abv_lt = abvSelector(abv)[1]
    const ibu_gt = ibuSelector(ibu)[0]
    const ibu_lt = ibuSelector(ibu)[1]
    const ebc_gt = ebcSelector(ebc)[0]
    const ebc_lt = ebcSelector(ebc)[1]
    const selectorString = (`https://api.punkapi.com/v2/beers?=abv_gt=${abv_gt}&abv_lt=${abv_lt}&ibu_gt=${ibu_gt}&ibu_lt=${ibu_lt}&ebc_gt=${ebc_gt}&ebc_lt=${ebc_lt}`)
    console.log(selectorString)
})