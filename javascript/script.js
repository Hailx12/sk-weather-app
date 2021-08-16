//Day & Time
function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

//Weather Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="card">
            <div class="card-body">  
              <div class="row">
                <div class="col-sm-6" class="forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                  <div class="col-sm-2" class="forecast-condition">
                    <img
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      width="40"
                    />
                  </div>
                  <div class="col-sm-4" class="forecast-temperature">
                    <span class="temp-max">${Math.round(
                      forecastDay.temp.max
                    )}°</span> |
                    <span class="temp-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + ``;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bc77907b0e11a419a6d57d1e95e42bea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Weather Conditions
function showWeather(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].description;

  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function getCity(city) {
  let apiKey = "bc77907b0e11a419a6d57d1e95e42bea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function inputSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getCity(city);
}

function currentLocation(position) {
  console.log(position);
  let apiKey = "bc77907b0e11a419a6d57d1e95e42bea";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCurrrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitCalc = (14 * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(fahrenheitCalc);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentTime = new Date();
let currentDate = document.querySelector("#date-time");
currentDate.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-engine");
form.addEventListener("submit", inputSubmit);

let button = document.querySelector("#submit-current");
button.addEventListener("click", searchCurrrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

getCity("Rotterdam");
