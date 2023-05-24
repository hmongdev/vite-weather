// city search
// https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=b601b84d0e7ce5864247288c5731f8ae

// lat and lon
// https://api.openweathermap.org/data/2.5/weather?lat=44.98&lon=-93.2638&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

// forecast
// https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&appid=b601b84d0e7ce5864247288c5731f8ae&units=imperial

const OPEN_API_URL = 'https://api.openweathermap.org/data/2.5';

const OPEN_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY;

const OPEN_API_ICON = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export { OPEN_API_URL, OPEN_API_KEY, OPEN_API_ICON };
