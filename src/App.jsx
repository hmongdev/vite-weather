import { useEffect } from 'react';
import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';
import { useState } from 'react';
import { fetchFinalWeatherData } from './api/openWeatherApi';
import ForecastWeather from './components/ForecastWeather';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [weather, setWeather] = useState(false);
	const [location, setLocation] = useState(undefined);

	const fetchWeather = () => {
		fetchFinalWeatherData({
			...location,
			units,
		}).then((data) => setWeather(data));
	};

	// const formatBackground = () => {
	// 	console.log(`inside formatBackground`);
	// 	//standard background
	// 	if (!weather)
	// 		return 'bg-gradient-to-br from-cyan-500 to to-blue-900';

	// 	const threshold = units === 'imperial' ? 20 : 60;
	// 	if (weather.temp <= threshold) {
	// 		return 'from-cyan-500 to-blue-500';
	// 	} else {
	// 		//else weather is warm...
	// 		return 'from-yellow-500 to-orange-500';
	// 	}
	// };

	//location
	const handleLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;

				setLocation({
					lat,
					lon,
				});
			});
		}
		fetchWeather();
	};

	useEffect(() => {
		if (location == null) {
			handleLocation();
		} else {
			fetchWeather();
		}
	}, [location, units]);

	//city
	const selectCity = (selectedCity) => {
		let lat = selectedCity.lat;
		let lon = selectedCity.lon;

		console.log(`selectCity in App.jsx`, selectedCity);

		setLocation({ lat, lon });
		fetchWeather();
	};

	console.log(`weather`, weather);
	// console.log(`location`, location);

	return (
		<div
			id="viewPort"
			className="h-screen w-screen text-left p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
		>
			<SearchBar
				onSelectCity={selectCity}
				onLocationChange={handleLocation}
			/>
			{weather && (
				<>
					<CurrentWeather
						setUnits={setUnits}
						weather={weather}
					/>
					<ForecastWeather
						items={weather.hourly}
					/>
				</>
			)}
		</div>
	);
};

export default App;
