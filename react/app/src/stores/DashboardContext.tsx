import { createContext } from "react";

enum DisplayTypeOptions {
	Line = "Line",
	Bar = "Bar",
	None = "None",
}

export const DISPLAY_TYPE_OPTIONS = [
	DisplayTypeOptions.Line,
	DisplayTypeOptions.Bar,
	DisplayTypeOptions.None,
];

export type Options = {
	startDate: Date;
	endDate: Date;
	displayNet: boolean;
	incomeDisplayType: DisplayTypeOptions;
	projectIncome: boolean;
	expenseDisplayType: DisplayTypeOptions;
};

export type Context = {
    options: Options,
    updateOptions: (optionName: string, value: string | Date | boolean) => void 
}

const DEFAULT_END_DATE = new Date();

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setDate(DEFAULT_END_DATE.getDate() - 7);

export const defaultContext = {
    options: {
        startDate: DEFAULT_START_DATE,
        endDate: DEFAULT_END_DATE,
        displayNet: false,
        incomeDisplayType: DISPLAY_TYPE_OPTIONS[0],
        projectIncome: false,
        expenseDisplayType: DISPLAY_TYPE_OPTIONS[0],
    },
    updateOptions: () => {}
};

export const DashboardContext = createContext<Context>(defaultContext)