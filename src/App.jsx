import { useEffect } from 'react';
import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';
import { useState } from 'react';
import { fetchFinalWeatherData } from './api/openWeatherApi';
import ForecastWeather from './components/ForecastWeather';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [weather, setWeather] = useState(null);
	const [location, setLocation] = useState(null);

	const fetchWeather = () => {
		fetchFinalWeatherData({
			...location,
			units,
		}).then((data) => setWeather(data));
	};

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
		if (!location) {
			handleLocation();
		} else {
			fetchWeather();
		}
	}, [location, units]);

	//city
	const selectCity = (selectedCity) => {
		let lat = selectedCity.lat;
		let lon = selectedCity.lon;

		// console.log(`selectCity in App.jsx`, selectedCity);

		setLocation({ lat, lon });

		fetchFinalWeatherData({
			...location,
			units,
		}).then((data) => setWeather(data));
	};

	console.log(`weather`, weather);

	return (
		<div
			id="viewPort"
			className="flex-col h-screen w-screen text-left p-10 bg-[#121418]"
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
