import { useEffect } from 'react';
import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';
import { useState } from 'react';
import { OPEN_API_KEY, OPEN_API_URL } from './api/openWeatherApi';

const App = () => {
	const [units, setUnits] = useState('imperial');
	const [current, setCurrent] = useState(null);
	const [forecast, setForecast] = useState(null);
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

				setCurrent(fetchCurrentWeather(lat, lon));
			});
		}
	};

	const handleSearch = (searchData) => {
		const [lat, lon] = searchData.value.split(' ');
		setLocation({ lat: Number(lat), lon: Number(lon) });

		const weatherResponse = fetch(
			`${OPEN_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_API_KEY}&units=${units}`
		);

		const forecastResponse = fetch(
			`${OPEN_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_API_KEY}&units=${units}`
		);

		Promise.all([weatherResponse, forecastResponse])
			.then(async (response) => {
				const weatherResponse =
					await response[0].json();
				const forecastResponse =
					await response[1].json();

				setCurrent({
					city: searchData.label,
					...weatherResponse,
				});
				setForecast({
					city: searchData.label,
					...forecastResponse,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log(`current`, current);
	console.log(`forecast`, forecast);

	return (
		<div
			id="viewPort"
			className="w-screen h-screen text-left bg-[#121418]"
		>
			<SearchBar
				onSearchChange={handleSearch}
				onLocationChange={handleLocation}
			/>
			{current && (
				<CurrentWeather
					setUnits={setUnits}
					current={current}
					forecast={forecast}
				/>
			)}
		</div>
	);
};

export default App;
