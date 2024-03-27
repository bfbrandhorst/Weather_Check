//const searchedEl = document.getElementById('searched-cities');
const citySearchBtn = document.querySelector("#searched-cities");




// function init() {
//     const searchedLocations = JSON.parse(localStorage.getItems('locations'));

//     if (searchedLocations.length === 0) {
//         return;
//     }

//     for (const location of searchedLocations) {

//     }
// }

// init();


function searchCity(event) {
    event.preventDefault();

    const searchedEl = document.querySelector('#city').value;



    if (!searchedEl) {
        console.error('You need a search input value!');
        return;
    }
    console.log("working");

}

citySearchBtn.addEventListener('submit', searchCity);