// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// api key: 28bd8a41dfb3c593b5f7a41fed6ff5fb

const weatherApi = {
  key: "28bd8a41dfb3c593b5f7a41fed6ff5fb",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

//event listener foe function key press
const searchInputBox = document.getElementById("input-box");
const searchButton = document
  .getElementById("searchBtn")
  .addEventListener("click", function fire(event) {
    // if (event.keyCode == 13) {
    console.log(document.getElementById("input-box").value);
    getWeatherReport(document.getElementById("input-box").value);
    document.querySelector(".weather-body").style.display = "block";
    // }
  });

//get weather report function
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

//show weather report
function showWeatherReport(weather) {
  console.log(weather);
  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.getElementById("temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C min / ${Math.ceil(weather.main.temp_max)}&deg;C max`;

  let weatherType = document.getElementById("weather");
  weatherType.innerHTML = `${weather.weather[0].main}`;

  let dateDay = document.getElementById("date");
  let todayDate = new Date();
  dateDay.innerHTML = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/Clear.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/Clouds.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/haze.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/Rain.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
  }
}
//Date function
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let day = days[dateArg.getDay()];
  let date = dateArg.getDate();

  return `${date} ${month} (${day}) ${year}`;
}
