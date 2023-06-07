import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { loadOptions } from '../api/geoCitiesApi';

const SearchBar = ({ onSelectCity, onLocationChange, setUnits }) => {
	const [search, setSearch] = useState(null);
	const [celsius, selectCelsius] = useState('');
	const [fahrenheit, selectFahrenheit] = useState(
		'text-purple-300 underline underline-offset-4'
	);

	const handleChange = (selected) => {
		onSelectCity(selected[0]);
		// console.log(`handleChange in searchBar.jsx`, selected[0]);
	};

	const handleUnits = (event) => {
		let units = event.target.name; //metric or imperial
		setUnits(units);

		if (units === 'imperial') {
			selectFahrenheit(
				'text-purple-300 underline underline-offset-4'
			);
			selectCelsius('text-white');
			setSpeedUnit('mph');
		} else if (units === 'metric') {
			selectCelsius(
				'text-purple-300 underline underline-offset-4'
			);
			selectFahrenheit('text-white');
			setSpeedUnit('kph');
		} else {
			selectFahrenheit('');
			selectCelsius('');
		}
	};

	return (
		<div
			id="searchBarContainer"
			className="flex gap-3 w-full h-[10%] py-5 justify-center items-center"
		>
			<div className="min-w-[50%]">
				<AsyncPaginate
					isMulti
					cacheOptions
					debounceTimeout={500}
					value={search}
					loadOptions={loadOptions}
					onChange={handleChange}
					placeholder="Search by City Name"
				/>
			</div>
			<button>
				<UilLocationPoint
					onClick={onLocationChange}
					size={30}
					className="text-white cursor-pointer transition ease-out hover:text-purple-200 hover:scale-125"
				/>
			</button>
			<div className="flex gap-2">
				<button
					name="imperial"
					className={`w-[1rem] h-fit py-2 text-2xl rounded-full ${fahrenheit}`}
					onClick={handleUnits}
				>
					F
				</button>
				<button
					name="metric"
					className={`w-[1rem] h-fit py-2 text-2xl rounded-full ${celsius}`}
					onClick={handleUnits}
				>
					C
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
