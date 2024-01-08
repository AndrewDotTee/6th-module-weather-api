var apiKey = "a554a34679e6d0de91cb092b63d320b3";

function getStoredCityData() {
  return localStorage.getItem('cityData') || '';
}

function updateStoredCityData(newData) {
  localStorage.setItem('cityData', newData);
}

function getWeather() {
  var cityInput = document.getElementById('cityInput').value;
  var weatherInfo = document.getElementById('weatherInfo');

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
    .then(response => response.json())
    .then(({ name, main, weather, wind, dt }) => {
      var temperatureKelvin = main.temp;
      var temperatureCelsius = temperatureKelvin - 273.15;
      var humidity = main.humidity;
      var description = weather[0].description;
      var windSpeed = wind.speed;
      var date = new Date(dt * 1000);
      var formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      var currentWeatherEntry = `<div id="${name.replace(/\s/g, '')}" class="cityDataEntry">
                                         <p>City: ${name}</p>
                                         <p>Date: ${formattedDate}</p>
                                         <p>Temperature: ${temperatureCelsius.toFixed(2)}°C</p>
                                         <p>Humidity: ${humidity}%</p>
                                         <p>Weather: ${description}</p>
                                         <p>Wind Speed: ${windSpeed} m/s</p>     
                                       </div>`;

      weatherInfo.innerHTML += currentWeatherEntry;

      localStorage.setItem('cityData', weatherInfo.innerHTML);

      createCityButton(name);
    });
};

function createCityButton(city) {
  var cityButtons = document.getElementById('cityButtons');
  var button = document.createElement('button');
  button.textContent = city;
  button.onclick = function () {
    toggleWeatherData(city);
  };
  cityButtons.appendChild(button);
};

function toggleWeatherData(city) {
  var cityEntry = document.getElementById(city.replace(/\s/g, ''));
  if (cityEntry) {
    var displayStyle = cityEntry.style.display === 'none' ? 'block' : 'none';
    cityEntry.style.display = displayStyle;
  };
};

window.onload = function () {
  var weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = localStorage.getItem('cityData') || '';
};