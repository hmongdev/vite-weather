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

	//location
	const handleLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;

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

	console.log(`weather`, weather);
	console.log(`location`, location);
	// console.log(`env.VITE_API_KEY`, env.VITE_API_KEY);

	return (
		<div
			id="viewPort"
			className="flex-col justify-center items-center min-w-screen min-h-screen p-5 bg-[#181A20]"
		>
			<SearchBar
				onSelectCity={selectCity}
				onLocationChange={handleLocation}
				setUnits={setUnits}
			/>
			{weather && (
				<>
					<CurrentWeather weather={weather} />
					<ForecastWeather
						items={weather.hourly}
					/>
				</>
			)}
		</div>
	);
};

export default App;
