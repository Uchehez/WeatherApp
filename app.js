
const api = {
  key: '727ab560c134897246e727db3fa72299',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    getResult(searchBox.value);
    // console.log(searchBox.value);
  }
}

function getResult(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
    return weather.json();
  }).then(displayResult);
}

function displayResult(weather) {
  console.log(weather);
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name},${weather.sys.country}`;
  const date = document.querySelector('.location .date');
  const now = new Date();
  date.innerText = dateBuilder(now);
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = `${weather.weather[0].main}`
  let hilow = document.querySelector('.current .hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`

}

function dateBuilder(d) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let toDay = days[d.getDay()];
  let disMonth = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  return `${toDay} ${date} ${disMonth} ${year}`
}
