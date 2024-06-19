import { createContext } from "react";

import { Category, Type, Transaction, Forecast } from "../models";

export type Context = {
	hasNetworkError: boolean;
	isLoadingData: boolean;

	categories: Category[];
	addNewCategories: (newCategories: Category[]) => void;

	types: Type[];

	transactions: Transaction[];
	setTransactions: (transactions: Transaction[]) => void;
	updateTransaction: (transaction: Transaction) => void;
	addTransactions: (transactions: Transaction[]) => void;

	forecasts: Forecast[];
	setForecasts: (forecasts: Forecast[]) => void;

	averageDailyIncome: number;
};

const defaultContext: Context = {
	hasNetworkError: false,
	isLoadingData: false,

	categories: [],
	addNewCategories: (newCategories: Category[]) => {},

	types: [],

	transactions: [],
	setTransactions: (transactions: Transaction[]) => {},
	updateTransaction: (transaction: Transaction) => {},
	addTransactions: (transactions: Transaction[]) => {},

	forecasts: [],
	setForecasts: (forecasts: Forecast[]) => {},

	averageDailyIncome: 0,
};

export const DataContext = createContext<Context>(defaultContext);
