import React, { useState } from 'react';

export const CurrentWeather = () => {
	const [fahrenheit, setFahrenheit] = useState('');
	const [celsius, setCelsius] = useState('');

	const selectUnit = (event) => {
		event.preventDefault();
		if (event.target.id === 'fahrenheit') {
			setFahrenheit(
				'text-purple-300 underline underline-offset-4'
			);
			setCelsius('text-white');
		}

		if (event.target.id === 'celsius') {
			setCelsius(
				'text-purple-300 underline underline-offset-4'
			);
			setFahrenheit('text-white');
		}
	};

	return (
		<div className="flex flex-col gap-10 bg-[#121418] w-full h-full rounded-xl p-7">
			<div className="flex w-[65%] justify-between mx-auto text-gray-400">
				<h1>Chanhassen, US</h1>
				<h1>Monday, May 22</h1>
			</div>
			<hr />
			<div className="flex justify-between min-h-[10rem]">
				<div className="flex w-1/2 justify-center gap-1 p-2">
					<img
						src=""
						alt="weather-icon"
						className="w-[6rem] h-[6rem]"
					/>
					<div>
						<h2 className="text-[3.5rem] h-fit font-light">
							65°
						</h2>
						<div className="flex justify-between">
							<h4>79°</h4>
							<h4>58°</h4>
						</div>
					</div>

					<div className="flex gap-1">
						<button
							id="fahrenheit"
							className={`w-[2rem] h-[4rem] text-2xl rounded-full ${fahrenheit}`}
							onClick={selectUnit}
						>
							F
						</button>
						<button
							id="celsius"
							className={`w-[2rem] h-[4rem] text-2xl rounded-full ${celsius}`}
							onClick={selectUnit}
						>
							C
						</button>
					</div>
				</div>
				<div className="flex w-1/2 flex-col justify-center items-center gap-2">
					<h1 className="text-3xl">Clear Sky</h1>
					<div className="flex justify-between w-3/5">
						<p>Humidity</p>
						<p>60%</p>
					</div>
					<div className="flex justify-between w-3/5">
						<p>Precipitation:</p>
						<p>60%</p>
					</div>
					<div className="flex justify-between w-3/5">
						<p>Wind:</p>
						<p>0.28 mph</p>
					</div>
				</div>
			</div>
			<div className="min-h-[10rem]">hello world</div>
			<div className="min-h-[10rem]">hello world</div>
		</div>
	);
};
