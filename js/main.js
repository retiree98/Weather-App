let forecastTable = document.getElementById("forecast-table");
let searchLocation = document.getElementById("search-location");
let submitLocation = document.getElementById("submit-location");
let formLocation = document.getElementById("form-location");

async function search(q) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=01f431fe0d0d47c6aef32638242006&q=${q}&days=3`
  );
  console.log(response);
  let data = await response.json();
  console.log(data);
  displayCurrent(
    data.current,
    data.location,
    data.forecast.forecastday[0].day.daily_chance_of_rain
  );
  displayAnother(data.forecast.forecastday);
}
search("cairo");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const windDir = {
  N: "North",
  NbE: "North by East",
  NNE: "North-Northeast",
  NEbN: "Northeast by North",
  NE: "Northeast",
  NEbE: "Northeast by East",
  ENE: "East-Northeast",
  EbN: "East by North",
  E: "East",
  EbS: "East by South",
  ESE: "East-Southeast",
  SEbE: "Southeast by East",
  SE: "Southeast",
  SEbS: "Southeast by South",
  SSE: "South-Southeast",
  SbE: "South by East",
  S: "South",
  SbW: "South by West",
  SSW: "South-Southwest",
  SWbS: "Southwest by South",
  SW: "Southwest",
  SWbW: "Southwest by West",
  WSW: "West-Southwest",
  WbS: "West by South",
  W: "West",
  WbN: "West by North",
  WNW: "West-Northwest",
  NWbW: "Northwest by West",
  NW: "Northwest",
  NWbN: "Northwest by North",
  NNW: "North-Northwest",
  NbW: "North by West",
};

function displayCurrent(current, location, rain) {
  if (current != null) {
    let time = new Date(current.last_updated);
    let content = `
        <div class="col-lg-4 forecast forecast-today p-0">
        <div
        class="forecast-header d-flex justify-content-between align-items-center"
        >
        <p class="day m-0">${days[time.getDay()]}</p>
        <p class="date m-0">${time.getDate() + monthNames[time.getMonth()]}</p>
        </div>
        <div class="forecast-content">
        <h2 class="location">${location.name}</h2>
        <div class="degree d-flex justify-content-between flex-wrap">
        <div class="num">${current.temp_c}<sup>o</sup>C</div>
        <div class="forecast-icon">
        <img
        src="https:${current.condition.icon}"
        alt=""
        class="w-100"
        />
        </div>
        </div>
        <p class="custom">${current.condition.text}</p>
        <div class="forecast-others">
        <span><img src="./imgs/icon-umberella.png" alt="" />${rain}%</span>
        <span><img src="./imgs/icon-wind.png" alt="" />${
          current.wind_kph
        }km/h</span>
        <span><img src="./imgs/icon-compass.png" alt="" />${
          windDir[current.wind_dir]
        }</span>
        </div>
        </div>
        </div>
        `;
    forecastTable.innerHTML = content;
  }

}
function displayAnother(f) {
  if (f && f != null) {
    let content = "";
    for (let i = 1; i < f.length; i++) {
      content += `
            <div class="col-lg-4 forecast forecast-another text-center p-0">
            <div class="forecast-header">
            <p class="day m-0">${days[new Date(f[i].date).getDay()]}</p>
            </div>
            <div class="forecast-content">
            <div class="forecast-icon mx-auto">
            <img
            src="https:${f[i].day.condition.icon}"
                  alt=""
                  class="w-100"
                  />
                  </div>
                  <p class="max-degree">${f[i].day.maxtemp_c}<sup>o</sup>C</p>
                  <p class="min-degree">${f[i].day.mintemp_c}<sup>o</sup>C</p>
                  <p class="custom text-center">${f[i].day.condition.text}</p>
                  </div>
                  </div>
                  `;
    }
    forecastTable.innerHTML += content;
  }
}

searchLocation.addEventListener("keyup", (e) => {
  search(e.target.value);
});
submitLocation.addEventListener("click", () => {
  search(searchLocation.value);
});
formLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  search(searchLocation.value);
});
