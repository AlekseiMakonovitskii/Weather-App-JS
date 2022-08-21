const enterName = document.querySelector(`#enterName`);
const getLocation = document.querySelector(`#getLocation`);
const searchBtn = document.querySelector(`#searchBtn`);
const main = document.querySelector(`.main`);
const mainBox = document.querySelector(`.main-box`);

const getCityCoords = function (city) {
  if (!city) {
    city = enterName.value;
  }

  if (city.length < 1) {
    return;
  }

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2034943004183163ccc8173fc39572d8`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const currentCity = [data[0].name, data[0].lat, data[0].lon];
      getWeather(currentCity);
    });
};

const kelvinToCelsius = function (kelvin) {
  return kelvin - 273.15;
};

const getWeather = function (data) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data[1]}&lon=${data[2]}&appid=2034943004183163ccc8173fc39572d8`;

  fetch(url)
    .then(res => res.json())
    .then(weather => {
      const temp = Math.round(kelvinToCelsius(weather.main.temp));
      const feelsLike = Math.round(kelvinToCelsius(weather.main.feels_like));
      const humidity = weather.main.humidity;

      const weatherData = [temp, feelsLike, humidity];

      renderWeather(data[0], weatherData);
    });
};

const renderWeather = function (name, data) {
  const html = `
			<div class="enter-city show-city main-box">
			<div class="enter-header show-header">
				<button class="backBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg></button>
				<h1>Weather App</h1>
			</div>

			<div class="enter-body show-body">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1z"/></svg>
				<h1>${data[0]}&#8451</h1>
				<div class="location">
					<div class="location-image">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
					</div>
					<h3>${name}</h3>
				</div>
			</div>


			<div class="enter-footer show-footer">
				<div class="feels-section footer-sections">
					<div class="image">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M272 278.5V112c0-61.87-50.12-112-111.1-112S48 50.13 48 112v166.5c-19.75 24.75-32 55.5-32 89.5c0 79.5 64.5 143.1 144 143.1S304 447.5 304 368C304 334 291.8 303.1 272 278.5zM160 448c-44.13 0-80-35.87-80-79.1c0-25.5 12.25-48.88 32-63.75v-192.3c0-26.5 21.5-48 48-48s48 21.5 48 48v192.3c19.75 14.75 32 38.25 32 63.75C240 412.1 204.1 448 160 448zM160 320c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S186.5 320 160 320z"/></svg>
					</div>
					<div class="section-info">
						<h2>${data[1]}&#8451</h2>
						<p>Feels like</p>
					</div>
				</div>

				<div class="humility-section footer-sections">
					<div class="image">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M16 319.1C16 245.9 118.3 89.43 166.9 19.3C179.2 1.585 204.8 1.585 217.1 19.3C265.7 89.43 368 245.9 368 319.1C368 417.2 289.2 496 192 496C94.8 496 16 417.2 16 319.1zM112 319.1C112 311.2 104.8 303.1 96 303.1C87.16 303.1 80 311.2 80 319.1C80 381.9 130.1 432 192 432C200.8 432 208 424.8 208 416C208 407.2 200.8 400 192 400C147.8 400 112 364.2 112 319.1z"/></svg>
					</div>
					<div class="section-info">
						<h2>${data[2]}%</h2>
						<p>Humidity</p>
					</div>
				</div>
			</div>
		</div>
	`;

  mainBox.style.display = `none`;
  main.insertAdjacentHTML(`afterbegin`, html);
  document.querySelector(`.backBtn`).addEventListener(`click`, getBack);
};

const getBack = function () {
  mainBox.style.display = `block`;
  document.querySelector(`.show-city`).remove();
};

const eventsHelper = function () {
  getCityCoords();
  enterName.value = ``;
};

const getDeviceLocation = function () {
  const helper = loc => {
    const currentLocation = [`smth`, loc.coords.latitude, loc.coords.longitude];

    getCityName(currentLocation[1], currentLocation[2]);
  };

  navigator.geolocation.getCurrentPosition(helper);
};

const getCityName = (lat, lon) => {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=2034943004183163ccc8173fc39572d8`;
  fetch(url)
    .then(res => res.json())
    .then(city => getCityCoords(`` + city[0].name));
};

window.addEventListener(`keypress`, function (e) {
  if (e.key === `Enter`) {
    eventsHelper();
  }
});

searchBtn.addEventListener(`click`, () => {
  eventsHelper();
});

getLocation.addEventListener(`click`, getDeviceLocation);
