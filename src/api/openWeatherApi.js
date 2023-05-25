// city search
// https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=b601b84d0e7ce5864247288c5731f8ae

// lat and lon
// https://api.openweathermap.org/data/2.5/weather?lat=44.98&lon=-93.2638&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

// forecast
// https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&units=imperial&appid=b601b84d0e7ce5864247288c5731f8ae

const OPEN_API_URL = 'https://api.openweathermap.org/data/2.5';
const OPEN_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY;

const fetchFinalWeatherData = async (searchParams) => {
	//weather call
	const finalCurrentWeather = await fetchWeatherApi('weather', {
		lat: searchParams.lat,
		lon: searchParams.lon,
		units: searchParams.units,
	}).then(formatCurrentWeather);

	//forecast call

	return { ...finalCurrentWeather };
};

const formatCurrentWeather = (data) => {
	const {
		coord: { lat, lon },
		dt,
		name: cityName,
		main: { feels_like, humidity, temp, temp_min, temp_max },
		sys: { country, sunrise, sunset },
		weather,
		wind: { speed },
	} = data;

	const { description, icon } = weather[0];

	return {
		lat,
		lon,
		dt,
		cityName,
		feels_like,
		humidity,
		temp,
		temp_min,
		temp_max,
		weather,
		country,
		sunrise,
		sunset,
		description,
		icon,
		speed,
	};
};

const fetchWeatherApi = async (weatherType, searchParams) => {
	const url = new URL(`${OPEN_API_URL}/${weatherType}`);

	url.search = new URLSearchParams({
		...searchParams,
		appid: OPEN_API_KEY,
		units: searchParams.units,
	});

	console.log(`url`, url);

	const response = await fetch(url).then((res) => res.json());
	return response;
};

const OPEN_API_ICON = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export { OPEN_API_URL, OPEN_API_KEY, OPEN_API_ICON, fetchFinalWeatherData };
