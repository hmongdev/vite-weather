// city search
// https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=b601b84d0e7ce5864247288c5731f8ae

// lat and lon
// https://api.openweathermap.org/data/2.5/weather?lat=44.98&lon=-93.2638&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

// forecast
// https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&units=imperial&appid=b601b84d0e7ce5864247288c5731f8ae

import { DateTime } from 'luxon';
const OPEN_API_URL = 'https://api.openweathermap.org/data/3.0';
const OPEN_API_KEY = import.meta.env.VITE_API_KEY;

const fetchWeatherApi = async (weatherType, searchParams) => {
	const url = new URL(`${OPEN_API_URL}/${weatherType}`);

	console.log(`searchParams`, searchParams);
	// console.log(`OPEN_API_KEY`, OPEN_API_KEY);

	url.search = new URLSearchParams({
		...searchParams,
		appid: OPEN_API_KEY,
		units: searchParams.units,
	});

	// console.log(`url`, url);

	return await fetch(url).then((res) => res.json());
};

const fetchFinalWeatherData = async (searchParams) => {
	//weather call
	const finalCurrentWeather = await fetchWeatherApi('onecall', {
		lat: searchParams.lat,
		lon: searchParams.lon,
		units: searchParams.units,
	}).then(formatCurrentWeather);

	//forecast call

	const { lat, lon } = finalCurrentWeather;

	const finalForecastWeather = await fetchWeatherApi('forecast', {
		lat,
		lon,
		units: searchParams.units,
	}).then(formatForecastWeather);

	return { ...finalCurrentWeather, ...finalForecastWeather };
};

const formatCurrentWeather = (data) => {
	// console.log(`data`, data);
	const {
		coord: { lat, lon },
		name: weatherCityName,
		dt,
		main: { feels_like, humidity, temp, temp_min, temp_max },
		sys: { country, sunrise, sunset },
		weather,
		wind: { speed },
	} = data;

	const { description, icon } = weather[0];

	return {
		lat,
		weatherCityName,
		lon,
		dt,
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

const formatForecastWeather = (data) => {
	let { timezone, hourly } = data;

	console.log(`formatForecastWeather`, data.list.slice(1, 6));

	hourly = data.list.slice(0, 5).map((d) => {
		return {
			day: formatToLocalTime(d.dt, timezone, 'ccc'),
			time: formatToLocalTime(d.dt, timezone, 'h:mm a'),
			temp: d.main.feels_like,
			icon: d.weather[0].icon,
		};
	});

	return {
		timezone,
		hourly,
	};
};

const formatToLocalTime = (
	secs,
	timezone,
	// format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
	format = "ccc, LLL d' | 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(timezone).toFormat(format);

const fetchIconCode = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export {
	OPEN_API_URL,
	OPEN_API_KEY,
	fetchIconCode,
	fetchFinalWeatherData,
	formatToLocalTime,
};
