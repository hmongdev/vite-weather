import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { loadOptions } from '../api/geoCitiesApi';

const SearchBar = ({ onSelectCity, onLocationChange }) => {
	const [search, setSearch] = useState(null);

	const handleChange = (selected) => {
		onSelectCity(selected);
		console.log(`handleChange in searchBar.jsx`, selected);
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
		</div>
	);
};

export default SearchBar;
