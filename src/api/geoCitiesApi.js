const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key':
			'304c19607fmsh7c2413829814d35p1dfa7bjsn0cba69763743',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
	},
};

export const loadOptions = async (searchQuery, loadedOptions) => {
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
