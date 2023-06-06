import React, { useState } from 'react';
import { OPEN_API_ICON } from '../api/openWeatherApi';

export const CurrentWeather = ({
	setUnits,
	weather: {
		weatherCityName,
		lat,
		lon,
		dt,
		feels_like,
		humidity,
		temp,
		temp_min,
		temp_max,
		weather,
		country,
		sunrise,
		sunset,
		description,
		icon,
		speed,
	},
}) => {
	const [celsius, selectCelsius] = useState('');
	const [fahrenheit, selectFahrenheit] = useState(
		'text-purple-300 underline underline-offset-4'
	);
	const [speedUnit, setSpeedUnit] = useState('mph');

	const handleUnits = (event) => {
		let units = event.target.name; //metric or imperial
		setUnits(units);

		if (units === 'imperial') {
			selectFahrenheit(
				'text-purple-300 underline underline-offset-4'
			);
			selectCelsius('text-white');
			setSpeedUnit('mph');
		} else if (units === 'metric') {
			selectCelsius(
				'text-purple-300 underline underline-offset-4'
			);
			selectFahrenheit('text-white');
			setSpeedUnit('kph');
		} else {
			selectFahrenheit('');
			selectCelsius('');
		}
	};

	return (
		<div className="flex flex-col gap-10 bg-[#121418] w-full h-full rounded-xl p-7">
			<div
				id="cityName-date"
				className="flex w-[65%] justify-between mx-auto text-gray-400"
			>
				<h1>{weatherCityName}</h1>
				<h1>May 25, 2023</h1>
			</div>
			<hr />
			<div className="flex justify-between min-h-[10rem]">
				<div className="flex w-1/2 justify-center gap-2 p-2">
					<img
						src={OPEN_API_ICON(icon)}
						alt="weather-icon"
						className="w-[6rem] h-[6rem]"
					/>
					<div>
						<h2 className="text-[4rem] h-fit font-light">
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

					<div className="flex gap-2">
						<button
							name="imperial"
							className={`w-[2rem] h-[4rem] text-2xl rounded-full ${fahrenheit}`}
							onClick={handleUnits}
						>
							F
						</button>
						<button
							name="metric"
							className={`w-[2rem] h-[4rem] text-2xl rounded-full ${celsius}`}
							onClick={handleUnits}
						>
							C
						</button>
					</div>
				</div>
				<div className="flex w-1/2 flex-col justify-center items-center gap-2">
					<h1 className="text-3xl capitalize">
						{description}
					</h1>
					<div className="flex justify-between w-3/5">
						<p>Humidity</p>
						<p>{humidity}%</p>
					</div>
					<div className="flex justify-between w-3/5">
						<p>Feels Like:</p>
						<p>{Math.round(feels_like)}°</p>
					</div>
					<div className="flex justify-between w-3/5">
						<p>Wind:</p>
						<p>
							{Math.round(speed)}{' '}
							{speedUnit}
						</p>
					</div>
				</div>
			</div>
			{/* <div className="min-h-[10rem]">hello world</div> */}
		</div>
	);
};
