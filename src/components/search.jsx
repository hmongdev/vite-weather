import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../api/weatherService';

const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);

	const handleOnChange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	async function loadOptions(inputValue) {
		//request
		try {
			const request = await fetch(
				`${GEO_API_URL}/cities?namePrefix=${inputValue}`,
				geoApiOptions
			);
			//response
			const response = await request.json();

			//return
			return {
				options: response.data.map((city) => {
					console.log(`city info:`, city);
					return {
						value: `${city.latitude} ${city.longitude}`,
						label: `${city.name}, ${city.region} - ${city.country}`,
					};
				}),
			};
		} catch (error) {
			console.error(`Error:`, error);
		}
	}

	return (
		<AsyncPaginate
			placeholder="Search by City Name"
			debounceTimeout={600}
			value={search}
			loadOptions={loadOptions}
			onChange={handleOnChange}
		/>
	);
};

export default Search;
