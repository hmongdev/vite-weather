import Search from './components/search';

const App = () => {
	const handleOnSearchChange = (searchData) => {
		console.log(searchData);
	};

	return (
		<div className=" max-sm text-left p-5">
			<Search onSearchChange={handleOnSearchChange} />
		</div>
	);
};

export default App;
