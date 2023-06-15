import { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { useState } from 'react';
import { fetchFinalWeatherData } from './api/openWeatherApi';
import HourlyForecast from './components/HourlyForecast';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [weather, setWeather] = useState(false);
	const [location, setLocation] = useState(null);

	function formatBackground() {
		if (!weather) return `from-violet-900 to-purple-300`;
		const threshold = units === 'metric' ? 20 : 60;
		if (weather.temp <= threshold) {
			return 'from-cyan-600 to-blue-200';
		} else {
			return 'from-yellow-600 to-orange-200';
		}
	}

	const fetchWeather = () => {
		fetchFinalWeatherData({
			...location,
			units,
		}).then((data) => setWeather(data));
	};

	//location
	const handleLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude: lat, longitude: lon } =
				position.coords;

			setLocation({
				lat,
				lon,
			});
		});
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

	// console.log(`weather`, weather);
	// console.log(`location`, location);

	return (
		<div
			id="viewPort"
			className={`flex-col justify-center items-center min-w-screen min-h-screen text-white p-5 bg-gradient-to-b ${formatBackground()}`}
		>
			<SearchBar
				onSelectCity={selectCity}
				onLocationChange={handleLocation}
				setUnits={setUnits}
			/>
			{weather && (
				<>
					<CurrentWeather weather={weather} />
					<HourlyForecast
						items={weather.hourly}
					/>
				</>
			)}
		</div>
	);
};

export default App;
