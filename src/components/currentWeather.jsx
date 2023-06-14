import React, { useState } from 'react';
import { fetchIconCode } from '../api/openWeatherApi';
import { formatToLocalTime } from '../api/openWeatherApi';
import { UilTemperature, UilTear, UilWind } from '@iconscout/react-unicons';

export const CurrentWeather = ({
	weather: {
		weatherCityName,
		dt,
		feels_like,
		humidity,
		temp,
		temp_min,
		temp_max,
		country,
		description,
		icon,
		speed,
		timezone,
	},
}) => {
	const [speedUnit, setSpeedUnit] = useState('mph');

	return (
		<>
			<div className="flex w-full text-sm justify-between mx-auto mb-4">
				<h1>
					{weatherCityName}, {country}
				</h1>
				<h1>{formatToLocalTime(dt, timezone)}</h1>
			</div>
			<hr />
			<div className="flex justify-between min-h-[10rem]">
				<div className="flex w-1/2 justify-center gap-2 p-2">
					<img
						src={fetchIconCode(icon)}
						alt="weather-icon"
						className="w-[6rem] h-[6rem]"
					/>
					<div>
						<h2 className="text-[3rem] h-fit font-light">
							{Math.round(temp)}°
						</h2>
						<div className="flex justify-between">
							<h4>
								{Math.round(
									temp_max
								)}
								°
							</h4>
							<h4>
								{Math.round(
									temp_min
								)}
								°
							</h4>
						</div>
					</div>
				</div>

				<div className="flex w-1/2 flex-col justify-center items-center gap-2">
					<h1 className="text-2xl capitalize">
						{description}
					</h1>
					<div className="flex justify-between w-3/5">
						<UilTear
							size={25}
							className="sm:hidden"
						/>
						<p className="hidden sm:flex">
							Humidity
						</p>
						<p>{humidity}%</p>
					</div>
					<div className="flex justify-between w-3/5">
						<UilTemperature
							size={25}
							className="sm:hidden"
						/>
						<p className="hidden sm:flex">
							Feels Like
						</p>
						<p>{Math.round(feels_like)}°</p>
					</div>
					<div className="flex justify-between w-3/5">
						<UilWind
							size={25}
							className="sm:hidden"
						/>
						<p className="hidden sm:flex">
							Wind
						</p>
						<p>
							{Math.round(speed)}{' '}
							{speedUnit}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
