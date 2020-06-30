const apikey = "";
const url = "https://api.openweathermap.org/data/2.5/";

const searchinput = document.querySelector(".search");
searchinput.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    fetch(`${url}weather?q=${searchinput.value}&units=imperial&APPID=${apikey}`)
      .then((weather) => {
        return weather.json();
      })
      .then(getWeather);
  }
}

function getWeather(weather) {
  console.log(weather);
  let location = document.querySelector(".location");
  location.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.querySelector(".temperature");
  temperature.innerText = Math.round(`${weather.main.temp}`) + "°F";

  let currentWeather = document.querySelector(".weather");
  currentWeather.innerText = `${weather.weather[0].main}`;
  changeBackground(weather.main.temp);

  let dateFormat = new Date();
  let dateNow = dateFormat.getDate();
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
  let monthNow = months[dateFormat.getMonth()];
  let year = dateFormat.getFullYear();
  let date = document.querySelector(".date");
  date.innerText = `${monthNow} ${dateNow}, ${year}`;
  searchinput.value = "";
}

function changeBackground(temp) {
  if (temp < 32) {
    document.body.style.backgroundImage = "url('img/cold.jpg')";
  } else if (temp >= 33 && temp <= 60) {
    document.body.style.backgroundImage = "url('img/pleasant.jpg')";
  } else document.body.style.backgroundImage = "url('img/sunny.jpg')";

  return temp;
}
