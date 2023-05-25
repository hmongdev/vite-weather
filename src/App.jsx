import { useEffect } from 'react';
import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';
import { useState } from 'react';
import { fetchFinalWeatherData } from './api/openWeatherApi';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [weather, setWeather] = useState(null);
	const [location, setLocation] = useState({});

	useEffect(() => {
		handleLocation();
	}, [units]);

	const fetchWeather = async () => {
		await fetchFinalWeatherData({
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

	//city
	const selectCity = async (searchData) => {
		let lat = searchData.lat;
		let lon = searchData.lon;

		setLocation({
			lat: lat,
			lon: lon,
		});

		await fetchFinalWeatherData({ ...location, units }).then(
			(data) => setWeather(data)
		);
	};

	console.log(`weather`, weather);

	return (
		<div
			id="viewPort"
			className="w-screen h-screen text-left bg-[#121418]"
		>
			<SearchBar
				onSelectCity={selectCity}
				onLocationChange={handleLocation}
			/>
			{weather && (
				<CurrentWeather
					units={units}
					setUnits={setUnits}
					weather={weather}
				/>
			)}
		</div>
	);
};

export default App;
