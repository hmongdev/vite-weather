// city search
// https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=b601b84d0e7ce5864247288c5731f8ae

// lat and lon
// https://api.openweathermap.org/data/2.5/weather?lat=44.98&lon=-93.2638&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

// forecast
// https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

const OPEN_API_URL = 'https://api.openweathermap.org/data/2.5';

const OPEN_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY;

const fetchCurrentWeather = async () => {
	try {
		return (response = await fetch(
			`${OPEN_API_URL}/weather?lat=${lat}&lon=${lon}$appid=${OPEN_API_KEY}`
		));
	} catch (error) {
		alert(error.message);
	}
};

const fetchForecastWeather = async () => {
	try {
		return (response = await fetch(
			`${OPEN_API_URL}/forecast?lat=${lat}&lon=${lon}$appid=${OPEN_API_KEY}`
		));
	} catch (error) {
		alert(error.message);
	}
};

Promise.all([fetchCurrentWeather, fetchForecastWeather])
	.then(async (response) => {
		const weatherResponse = await response[0].json();
		const forecastResponse = await response[1].json();

		setCurrent({
			city: searchData.label,
			...weatherResponse,
		});
		setForecast({
			city: searchData.label,
			...forecastResponse,
		});
	})
	.catch((error) => {
		console.log(error);
	});

const OPEN_API_ICON = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export {
	OPEN_API_URL,
	OPEN_API_KEY,
	fetchCurrentWeather,
	fetchForecastWeather,
	OPEN_API_ICON,
};
