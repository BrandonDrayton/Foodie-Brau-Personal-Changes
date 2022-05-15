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
        excludeListJSON = JSON.stringify(excludeList)
        localStorage.setItem('excludeList', excludeListJSON)
        document.querySelector(`#beer-card-${removeRandom}`).remove()

    }
})