import SearchBar from './components/searchBar';
import { CurrentWeather } from './components/currentWeather';

const App = () => {
	const handleOnSearchChange = (searchData) => {
		console.log(searchData);
	};

	return (
		<div
			id="viewPort"
			className="w-screen h-screen text-left bg-[#121418]"
		>
			<SearchBar />
			<CurrentWeather />
		</div>
	);
};

export default App;
