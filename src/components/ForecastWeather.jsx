import { fetchIconCode } from '../api/openWeatherApi';

const ForecastWeather = ({ items }) => {
	return (
		<>
			<div className="flex flex-row items-center justify-between gap-5 p-5 text-white">
				{items.map((item, i) => (
					<div
						key={i}
						className="flex flex-col p-5 rounded-xl items-center bg-gray-700"
					>
						<p className="font-light text-sm">
							{item.time}
						</p>
						<img
							src={fetchIconCode(
								item.icon
							)}
							alt=""
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
