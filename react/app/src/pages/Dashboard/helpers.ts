import { Transaction } from "../../models";
import { Options } from "../../stores/DashboardContext";
import { Data, SeriesData } from "./Graph";

type Args = {
	data: Transaction[];
	startDate: string;
	endDate: string;
	averageDailyIncome: number;
	options: Options;
};

type ProcessedTypeData = {
	[date: string]: number | null;
};

type DataProcessedByType = {
	[type: string]: ProcessedTypeData;
};

export function processData(args: Args): Data {
	const { data, startDate, endDate, options, averageDailyIncome } = args;

	const dataProcessedByType: DataProcessedByType = processDataByType(data, startDate, endDate, options);

	projectIncome(dataProcessedByType, startDate, endDate, averageDailyIncome);

	if (options.displayNet) {
		calculateNet(dataProcessedByType);
	}
		
	const net = getNet(dataProcessedByType);
	const projectedNet = getProjectedNet(dataProcessedByType);
	const totalNet = moneyRound(net + projectedNet);
	const {minValue, maxValue} = getExtremes(dataProcessedByType);

	return {
		seriesData: getSeriesData(dataProcessedByType, options),
		net: net,
		projectedNet: projectedNet,
		totalNet: totalNet,
		minValue: minValue,
		maxValue: maxValue,
		tickValues: getTickValues(startDate, endDate)
	};
}

function processDataByType(data: Transaction[], startDate: string, endDate: string, options: Options) {
	const dataProcessedByType: DataProcessedByType = initializeDataProcessedByType(startDate, endDate, options);

	for (const transaction of data) {
		if (!transaction.category || !transaction.amount || !transaction.startDate)
			continue;

		const type = transaction.category.type.name;

		if (!dataProcessedByType[type]) {
			dataProcessedByType[type] = {};
		}

		if (transaction.startDate && transaction.endDate) {
			const rangeOfDates = getRangeOfDates(
				transaction.startDate,
				transaction.endDate
			);

			const amountPerDay = transaction.amount / rangeOfDates.length;
			for (const date of rangeOfDates) {
				if (date < startDate || date > endDate) {
					continue;
				}

				if (!dataProcessedByType[type][date]) {
					dataProcessedByType[type][date] = amountPerDay;
				} else {
					dataProcessedByType[type][date]! += amountPerDay;
				}
			}
		} else {
			const date = transaction.startDate;
			if (!dataProcessedByType[type][date]) {
				dataProcessedByType[type][date] = transaction.amount;
			} else {
				dataProcessedByType[type][date]! += transaction.amount;
			}
		}
	}

	return dataProcessedByType;
}

function initializeDataProcessedByType(startDateString: string, endDateString: string, options: Options): DataProcessedByType {
	const dataProcessedByType: DataProcessedByType = {};
	
	const currentDate = new Date(startDateString);
	let currentDateString = getDateString(currentDate);
	while (currentDateString <= endDateString) {
		if (!dataProcessedByType['Income']) {
			dataProcessedByType['Income'] = {};
		}

		if (!dataProcessedByType['Expense']) {
			dataProcessedByType['Expense'] = {};
		}

		if (!dataProcessedByType['Projected Income']) {
			dataProcessedByType['Projected Income'] = {};
		}

		dataProcessedByType['Income'][currentDateString] = null;
		dataProcessedByType['Expense'][currentDateString] = null;
		dataProcessedByType['Projected Income'][currentDateString] = null;

		if (options.displayNet) {
			if (!dataProcessedByType['Net']) {
				dataProcessedByType['Net'] = {};
			}

			dataProcessedByType['Net'][currentDateString] = null;
		}

		currentDate.setDate(currentDate.getDate() + 1);
		currentDateString = getDateString(currentDate);
	}

	return dataProcessedByType;
}

export function getDateString(date: Date): string {
	const string = date.toISOString();
	return string.split("T")[0];
}

function getRangeOfDates(startDate: string, endDate: string) {
	const rangeOfDates = [];

	const currentDate = new Date(startDate);
	let currentDateString = getDateString(currentDate);
	while (currentDateString <= endDate) {
		rangeOfDates.push(currentDateString);
		currentDate.setDate(currentDate.getDate() + 1);
		currentDateString = getDateString(currentDate);
	}

	return rangeOfDates;
}

function calculateNet(dataProcessedByType: DataProcessedByType) {
	const expense = dataProcessedByType.Expense;
	const income = dataProcessedByType.Income;

	const netData: ProcessedTypeData = {};
	for (const [date, _] of Object.entries(income)) {
		netData[date] = null;
		
		if (!income[date]) continue;

		if (income[date] && expense[date]) {
			const incomeAmount = income[date] as number;
			const expenseAmount = expense[date] as number;
			netData[date] = incomeAmount - expenseAmount;
		} else if (income[date]) {
			netData[date] = income[date];
		}
	}

	dataProcessedByType["Net"] = netData;

	return dataProcessedByType;
}

function projectIncome(dataProcessedByType: DataProcessedByType, startDate: string, endDate: string, averageDailyIncome: number) {
	const income = dataProcessedByType["Income"];
	const projectedIncome: ProcessedTypeData = {};

	let currentDate = new Date(startDate);
	let currentDateString = getDateString(currentDate);
	while (currentDateString <= endDate) {
		if (!income || !income[currentDateString]) {
			projectedIncome[currentDateString] = averageDailyIncome;
		}

		currentDate.setDate(currentDate.getDate() + 1);
		currentDateString = getDateString(currentDate);
	}

	dataProcessedByType["Projected Income"] = projectedIncome;

	return dataProcessedByType;
}

function getSeriesData(
	dataProcessedByType: DataProcessedByType,
	options: Options
): SeriesData[] {
	const seriesData: SeriesData[] = [];
	for (const type in dataProcessedByType) {
		const displayType = `${type.toLowerCase()}DisplayType` as
			| "incomeDisplayType"
			| "expenseDisplayType";
		if (options[displayType] === "None") continue;

		const dataProcessedByTypeList = [];
		for (const [date, amount] of Object.entries(dataProcessedByType[type])) {
			dataProcessedByTypeList.push({ x: date, y: amount });
		}
		const sortedDataList = dataProcessedByTypeList.sort((d1, d2) =>
			d1.x.localeCompare(d2.x)
		);

		const finalDataObject: SeriesData = { id: "", data: [{ x: "", y: 0 }] };
		finalDataObject.id = type;
		finalDataObject.data = sortedDataList;
		seriesData.push(finalDataObject);
	}

	return seriesData;
}

function getNet(dataProcessedByType: DataProcessedByType) {
	let net = 0;
	if (dataProcessedByType["Income"]) {
		const expenseSeries = dataProcessedByType["Expense"];
		const incomeSeries = dataProcessedByType["Income"];
		
		for (const date in incomeSeries) {
			if (!incomeSeries[date]) continue;
			
			net += incomeSeries[date] as number;

			if (expenseSeries[date]) {
				net -= expenseSeries[date] as number;
			}
		}
	}

	return moneyRound(net);
}

function getProjectedNet(dataProcessedByType: DataProcessedByType) {
	let projectedNet = 0;

	if (dataProcessedByType["Projected Income"]) {
		const expenseSeries = dataProcessedByType["Expense"];
		const projectedIncomeSeries = dataProcessedByType["Projected Income"];

		for (const date in projectedIncomeSeries) {
			if (projectedIncomeSeries[date]) {
				projectedNet += projectedIncomeSeries[date] as number;
			}

			if (expenseSeries[date]) {
				projectedNet -= expenseSeries[date] as number;
			}
		}
	}

	return moneyRound(projectedNet);
}

function moneyRound(amount: number) {
	amount = amount * 100;
	amount = Math.round(amount);
	return amount / 100;
}

function getExtremes(dataProcessedByType: DataProcessedByType) {
	let minValue = Number.MAX_VALUE;
	let maxValue = Number.MIN_VALUE;
	for (const dateValues of Object.values(dataProcessedByType)) {
		for (const value of Object.values(dateValues)) {
			if (value) {
				if (value < minValue) {
					minValue = value;
				}
				if (value > maxValue) {
					maxValue = value;
				}
			}
		}
	}

	return {minValue, maxValue};
}

function getTickValues(startDate: string, endDate: string) {
	const dates = getRangeOfDates(startDate, endDate);

	const tickValues = [];
	const numDates = dates.length;
	const numValuesToSkip = numDates > 30 ? 2 : 1;

	for (let i = 0; i < numDates; i += numValuesToSkip) {
		tickValues.push(dates[i]);
	}

	return tickValues;
}