import { fetchIconCode } from '../api/openWeatherApi';
import { UilTear } from '@iconscout/react-unicons';

const HourlyForecast = ({ items }) => {
	return (
		<>
			<h1>Hourly Forecast</h1>
			<div
				id="forecastContainer"
				className="flex flex-row items-center text-white min-h-[10rem] rounded-xl overflow-auto shadow-xl"
			>
				{items.map((item, i) => (
					<div
						id="forecastCard"
						key={i}
						className="flex flex-col gap-2 justify-between items-center text-lg min-w-[3rem] py-5 hover:bg-[#121318]"
					>
						<p className="text-center text-sm w-full">
							{item.time}
						</p>
						<hr />
						<img
							src={fetchIconCode(
								item.icon
							)}
							alt="weather-icon"
							className="w-full"
						/>
						<div>
							<p className="text-lg">{`${item.temp.toFixed()}°`}</p>
						</div>
						<div className="flex justify-center items-center">
							<UilTear
								size={15}
								className="sm:hidden"
							/>
							<p className="text-xs">{`${(
								item.pop * 10
							).toFixed()}%`}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default HourlyForecast;
