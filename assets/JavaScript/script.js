const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = "decfc900f74a3a313929a403ee57e25e";
const searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];


//const searchedEl = document.getElementById('searched-cities');
const todayContainer = document.querySelector(".today-weather");
const forecastContainer = document.querySelector(".five-day");
const searchHistoryContainer = document.querySelector("#history");
const citySearchBtn = document.querySelector("#searched-cities");


//History Display Functionality:
function renderSearchHistory() {
    searchHistoryContainer.innerHTML = "";

    for (let i = searchHistory.length - 1; i >= 0; i--) {
        const citySearchBtn = document.createElement('button');
        citySearchBtn.setAttribute('type', 'button');
        citySearchBtn.setAttribute('aria-controls', 'todaysWeather');
        citySearchBtn.classList.add('history-citySearchBtn', 'citySearchBtn-history');

        citySearchBtn.setAttribute('data-search', searchHistory[i]);
        citySearchBtn.textContent = searchHistory[i];
        searchHistoryContainer.append(citySearchBtn);

    }
}
renderSearchHistory();

function appendToHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);

    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    renderSearchHistory();
}




// function init() {
//     const searchedLocations = JSON.parse(localStorage.getItems('locations'));

//     if (searchedLocations.length === 0) {
//         return;
//     }

//     for (const location of searchedLocations) {

//     }
// }

// init();


async function searchCity(city) {
    console.log(city);
    try {

        const response = await fetch(`${weatherApiRootUrl}/data/2.5/weather?q=${city}&units=imperial&appid=${weatherApiKey}`)
        const data = await response.json()
        //console.log(data)
        const icon = data.weather[0].icon
        const url = `https://openweathermap.org/img/wn/${icon}.png`
        const todayWeather = `
        <div> 
            <h3>${data.name}</h3>
            <p>temp: ${data.main.temp}</p>
            <p>humidity: ${data.main.humidity}</p>
            <p>wind-speed: ${data.wind.speed}</p>
            <img src = "${url}"/>
        </div>
        
        `;

        todayContainer.innerHTML = todayWeather
        const lat = data.coord.lat
        const lon = data.coord.lon


        const fiveDayResponse = await fetch(
            `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`
        )
        const fiveDayData = await fiveDayResponse.json()

        const filteredArray = fiveDayData.list.filter((day) => day.dt_txt.includes("12:00:00"))
        console.log(filteredArray)

        let fiveDayCard = ""

        filteredArray.forEach((day) => {
            console.log(day)
            let date = new Date(day.dt_txt).toLocaleDateString().split(",")[0]
            const fiveIcon = data.weather[0].icon
            const fiveUrl = `https://openweathermap.org/img/wn/${fiveIcon}.png`
            fiveDayCard += `
            <div> 
            <h3>${date}</h3>
            <p>temp: ${day.main.temp}</p>
            <p>humidity: ${day.main.humidity}</p>
            <p>wind-speed: ${day.wind.speed}</p>
            <img src = "${fiveUrl}"/>
        </div>
            
            `;
            forecastContainer.innerHTML = fiveDayCard
        })
    } catch (error) {
        console.error("error fetching data", error)
    }
}



citySearchBtn.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchedEl = document.querySelector('#city').value.trim();
    if (!searchedEl) {
        console.error('You need a search input value!');
        return;
    }
    console.log("working");

    searchCity(searchedEl)
    appendToHistory(searchedEl);
});