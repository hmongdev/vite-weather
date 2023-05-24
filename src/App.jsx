import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';
import { useState } from 'react';
import { OPEN_API_URL, OPEN_API_KEY } from './api/openWeatherApi';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [current, setCurrent] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [location, setLocation] = useState({});

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

	const handleSearch = (searchData) => {
		const [lat, lon] = searchData.value.split(' ');
		setLocation({ lat: Number(lat), lon: Number(lon) });
	};

	console.log(location);

	return (
		<div
			id="viewPort"
			className="w-screen h-screen text-left bg-[#121418]"
		>
			<SearchBar
				onSearchChange={handleSearch}
				onLocationChange={handleLocation}
			/>
			<CurrentWeather />
		</div>
	);
};

export default App;
