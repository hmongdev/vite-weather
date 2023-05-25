import { useEffect } from 'react';
import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';
import { useState } from 'react';
import { fetchFinalWeatherData } from './api/openWeatherApi';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecastWeather, setForecastWeather] = useState(null);
	const [location, setLocation] = useState(null);

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
	};

	const selectCity = async (searchData) => {
		let lat = searchData.lat;
		let lon = searchData.lon;

		setLocation({
			lat: lat,
			lon: lon,
		});

		await fetchFinalWeatherData({ lat, lon, units }).then((data) =>
			setCurrentWeather(data)
		);
	};
	console.log(currentWeather);

	return (
		<div
			id="viewPort"
			className="w-screen h-screen text-left bg-[#121418]"
		>
			<SearchBar
				onSelectCity={selectCity}
				onLocationChange={handleLocation}
			/>
			<CurrentWeather
				setUnits={setUnits}
				current={currentWeather}
				forecast={forecastWeather}
			/>
		</div>
	);
};

export default App;
