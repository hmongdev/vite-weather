import { fetchIconCode } from '../api/openWeatherApi';

const ForecastWeather = ({ items }) => {
	return (
		<>
			<div className="flex flex-col sm:flex-row items-center justify-center p-5 text-white">
				{items.map((item, i) => (
					<div
						id="forecastCard"
						key={i}
						className="flex flex-row sm:flex-col min-w-[6.5rem] w-full sm:min-h-[10rem] rounded-xl justify-between items-center p-5 m-2 bg-slate-200"
					>
						<p className="font-light text-sm">
							{item.time}
						</p>
						<img
							src={fetchIconCode(
								item.icon
							)}
							alt="weather-icon"
							className="w-12 my-1"
						/>
						<p className="font-medium">{`${item.temp.toFixed()}°`}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default ForecastWeather;
