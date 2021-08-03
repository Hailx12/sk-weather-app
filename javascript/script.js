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

//Weather Conditions
function showWeather(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].description;

  //let outputIcon = document.querySelector("#current-Icon");
  //outputIcon.innerHTML = response.data.weather[0].icon;
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

let currentTime = new Date();
let currentDate = document.querySelector("#date-time");
currentDate.innerHTML = formatDate(currentTime);

let form = document.querySelector("#search-engine");
form.addEventListener("submit", inputSubmit);

let button = document.querySelector("#submit-current");
button.addEventListener("click", searchCurrrentLocation);
getCity("Rotterdam");
