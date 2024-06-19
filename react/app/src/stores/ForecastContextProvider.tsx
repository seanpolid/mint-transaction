import { ReactNode, useState } from "react";

import { Forecast } from "../models";
import { ForecastContext } from "./ForecastContext";

type Props = {
	children: ReactNode;
};

export const ForecastContextProvider = (props: Props) => {
	const [selectedForecast, setSelectedForecast] = useState<Forecast | null>(
		null
	);
	const [newForecasts, setNewForecasts] = useState([]);

	const handleSetSelectedForecast = (forecast: Forecast) => {
		setSelectedForecast(forecast);
	};

	const data = {
		selectedForecast,
		setSelectedForecast: handleSetSelectedForecast,

		newForecasts: newForecasts,
	};

	return (
		<ForecastContext.Provider value={data}>
			{props.children}
		</ForecastContext.Provider>
	);
};
