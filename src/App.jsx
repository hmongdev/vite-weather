import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';
import { useState } from 'react';
import { OPEN_API_URL, OPEN_API_KEY } from './api/openWeatherApi';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [current, setCurrent] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [userLocation, setUserLocation] = useState({});

	//userLocation
	const handleLocationClick = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;

				setUserLocation({
					lat,
					lon,
				});
			});
		}
	};

	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(' ');
		setUserLocation({ lat: Number(lat), lon: Number(lon) });
	};

	return (
		<div
			id="viewPort"
			className="w-screen h-screen text-left bg-[#121418]"
		>
			<SearchBar
				onSearchChange={handleOnSearchChange}
				onUserLocation={handleLocationClick}
			/>
			<CurrentWeather />
		</div>
	);
};

export default App;
