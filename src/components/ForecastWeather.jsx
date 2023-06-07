import { fetchIconCode } from '../api/openWeatherApi';

const ForecastWeather = ({ items }) => {
	return (
		<>
			<div className="flex flex-col sm:flex-row items-center justify-center p-5 text-white">
				{items.map((item, i) => (
					<div
						id="forecastCard"
						key={i}
						className="flex flex-row sm:flex-col min-w-[6.5rem] w-full sm:min-h-[10rem] rounded-2xl justify-between items-center p-5 m-2 hover:bg-[#121318]"
					>
						<p className="text-center font-light text-sm">
							{item.day}
							<br />
							{item.time}
						</p>
						<img
							src={fetchIconCode(
								item.icon
							)}
							alt="weather-icon"
							className="w-12 my-1"
						/>
						<div className="flex justify-between gap-7">
							<p className="font-medium">{`${item.tempMax.toFixed()}°`}</p>
							<p className="font-medium">{`${item.tempMin.toFixed()}°`}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default ForecastWeather;
