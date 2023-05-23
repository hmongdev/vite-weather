import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../api/geoCitiesApi';
import { UilLocationPoint } from '@iconscout/react-unicons';

const SearchBar = () => {
	const [search, setSearch] = useState(null);
	const [userLocation, setUserLocation] = useState({});

	const handleSearch = (searchData) => {
		setSearch(searchData);
	};

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
		console.log(navigator);
	};
	console.log(`userLocation is:`, userLocation);

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
					console.log(
						`response in loadOptions:`,
						city
					);
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
		<div
			id="searchBarContainer"
			className="flex gap-5 w-full h-[10%] py-10 justify-center items-center"
		>
			<div className="min-w-[50%]">
				<AsyncPaginate
					placeholder="Search by City Name"
					debounceTimeout={600}
					value={search}
					loadOptions={loadOptions}
					onChange={handleSearch}
				/>
			</div>
			<button>
				<UilLocationPoint
					onClick={handleLocationClick}
					size={30}
					className="text-white cursor-pointer transition ease-out hover:text-purple-200 hover:scale-125"
				/>
			</button>
		</div>
	);
};

export default SearchBar;
