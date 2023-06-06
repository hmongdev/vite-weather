import { fetchIconCode } from '../api/openWeatherApi';

const ForecastWeather = ({ items }) => {
	return (
		<div className="min-h-[10rem]">
			<div>
				<div className="flex items-center justify-start mt-6">
					{/* <p className="text-white font-medium uppercase">
						3-Hour Forecast
					</p> */}
				</div>
				<hr />
				<div className="flex flex-row items-center justify-between p-5 text-white">
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
			</div>
		</div>
	);
};

export default ForecastWeather;
