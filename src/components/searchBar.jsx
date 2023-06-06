import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../api/geoCitiesApi';
import { UilLocationPoint } from '@iconscout/react-unicons';

const SearchBar = ({ onSelectCity, onLocationChange }) => {
	const [search, setSearch] = useState(null);

	const handleChange = (selected) => {
		onSelectCity(selected[0]);
		// console.log(`handleChange in searchBar.jsx`, selected[0]);
	};

	const loadOptions = async (searchQuery, loadedOptions) => {
		//request
		const response = await fetch(
			`${GEO_API_URL}/cities?namePrefix=${searchQuery}&offset=${loadedOptions.length}&sort=name`,
			geoApiOptions
		).then((res) => res.json());

		//return
		return {
			options: response.data.map((city) => ({
				lat: city.latitude,
				lon: city.longitude,
				label: `${city.city}, ${city.region} - ${city.countryCode}`,
			})),
			hasMore: true,
		};
	};

	return (
		<div
			id="searchBarContainer"
			className="flex gap-5 w-full h-[10%] py-10 justify-center items-center"
		>
			<div className="min-w-[50%]">
				<AsyncPaginate
					isMulti
					cacheOptions
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
		</div>
	);
};

export default SearchBar;
