import { Transaction } from "../../models";
import { Options } from "./index";
import { Data, SeriesData } from "./Graph";

export function getDateString(date: Date): string {
	const string = date.toISOString();
	return string.split("T")[0];
}

type Args = {
	data: Transaction[];
	startDate: string;
	endDate: string;
	averageDailyIncome: number;
	options: Options;
};

type ProcessedTypeData = {
	[date: string]: number;
};

type ProcessedData = {
	[type: string]: ProcessedTypeData;
};

export function processData(args: Args): Data {
	const { data, startDate, endDate, options, averageDailyIncome } = args;

	const processedData: ProcessedData = {};
	for (const transaction of data) {
		if (!transaction.category || !transaction.amount || !transaction.startDate)
			continue;

		const type = transaction.category.type.name;

		if (!processedData[type]) {
			processedData[type] = {};
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

				if (!processedData[type][date]) {
					processedData[type][date] = amountPerDay;
				} else {
					processedData[type][date] += amountPerDay;
				}
			}
		} else {
			const date = transaction.startDate;
			if (!processedData[type][date]) {
				processedData[type][date] = transaction.amount;
			} else {
				processedData[type][date] += transaction.amount;
			}
		}
	}

	if (options.displayNet && processedData.Expense && processedData.Income) {
		const expense = processedData.Expense;
		const income = processedData.Income;

		const expenseDates = Object.keys(expense).sort();
		const incomeDates = Object.keys(income).sort();

		let expensePointer = 0;
		let incomePointer = 0;
		const incomeDatesLength = incomeDates.length;
		const expenseDatesLength = expenseDates.length;

		const netData: ProcessedTypeData = {};
		while (
			incomePointer < incomeDatesLength &&
			expensePointer < expenseDatesLength
		) {
			const expenseDate = expenseDates[expensePointer];
			const incomeDate = incomeDates[incomePointer];
			if (expenseDate === incomeDate) {
				netData[expenseDate] = income[incomeDate] - expense[expenseDate];
				expensePointer += 1;
				incomePointer += 1;
			} else if (expenseDate < incomeDate) {
				expensePointer = expensePointer += 1;
			} else {
				incomePointer = incomePointer += 1;
			}
		}

		processedData["Net"] = netData;
	}

	if (options.projectIncome) {
		const income = processedData["Income"];
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

		processedData["Projected Income"] = projectedIncome;
	}

	const net = getNet(processedData);
	const projectedNet = getProjectedNet(processedData);
	const totalNet = moneyRound(net + projectedNet);

	return {
		seriesData: getSeriesData(processedData, options),
		net: net,
		projectedNet: projectedNet,
		totalNet: totalNet,
		minValue: getMinValue(processedData),
	};
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

function getSeriesData(
	processedData: ProcessedData,
	options: Options
): SeriesData[] {
	const seriesData: SeriesData[] = [];
	for (const type in processedData) {
		const displayType = `${type.toLowerCase()}DisplayType` as
			| "incomeDisplayType"
			| "expenseDisplayType";
		if (options[displayType] === "None") continue;

		const processedDataList = [];
		for (const [date, amount] of Object.entries(processedData[type])) {
			processedDataList.push({ x: date, y: amount });
		}
		const sortedDataList = processedDataList.sort((d1, d2) =>
			d1.x.localeCompare(d2.x)
		);

		const finalDataObject: SeriesData = { id: "", data: [{ x: "", y: 0 }] };
		finalDataObject.id = type;
		finalDataObject.data = sortedDataList;
		seriesData.push(finalDataObject);
	}

	return seriesData;
}

function getNet(processedData: ProcessedData) {
	let net = 0;
	if (processedData["Income"]) {
		const expenseSeries = processedData["Expense"];
		const incomeSeries = processedData["Income"];

		for (const date in incomeSeries) {
			net += incomeSeries[date];
			if (expenseSeries && expenseSeries[date]) {
				net -= expenseSeries[date];
			}
		}
	}

	return moneyRound(net);
}

function getProjectedNet(processedData: ProcessedData) {
	let projectedNet = 0;

	if (processedData["Projected Income"]) {
		const expenseSeries = processedData["Expense"];
		const projectedIncomeSeries = processedData["Projected Income"];

		for (const date in projectedIncomeSeries) {
			projectedNet += projectedIncomeSeries[date];
			if (expenseSeries && expenseSeries[date]) {
				projectedNet -= expenseSeries[date];
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

function getMinValue(processedData: ProcessedData) {
	let minValue = Number.MAX_VALUE;
	for (const dateValues of Object.values(processedData)) {
		for (const value of Object.values(dateValues)) {
			if (value < minValue) {
				minValue = value;
			}
		}
	}

	return minValue;
}
