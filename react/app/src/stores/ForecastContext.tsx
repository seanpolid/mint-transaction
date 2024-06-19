import { createContext } from "react";

import { Forecast } from "../models";

export type Context = {
	selectedForecast: Forecast | null;
	setSelectedForecast: (forecast: Forecast) => void;

	newForecasts: Forecast[];
};

const defaultContext: Context = {
	selectedForecast: null,
	setSelectedForecast: (forecast: Forecast) => {},

	newForecasts: [],
};

export const ForecastContext = createContext<Context>(defaultContext);
