import { useContext, useMemo, useState, ChangeEvent } from "react";

import { DataContext } from "../../stores/DataContext";
import { Event } from "../../components/ToggleButtonWithLabel";
import { Options } from "./Options";
import { Graph } from "./Graph";
import { processData, getDateString } from "./helpers";
import style from "./style.module.css";

const DEFAULT_END_DATE = new Date();

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setDate(DEFAULT_END_DATE.getDate() - 7);

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

const DEFAULT_OPTIONS: Options = {
	startDate: DEFAULT_START_DATE,
	endDate: DEFAULT_END_DATE,
	displayNet: false,
	incomeDisplayType: DISPLAY_TYPE_OPTIONS[0],
	projectIncome: false,
	expenseDisplayType: DISPLAY_TYPE_OPTIONS[0],
};

export const Dashboard = () => {
	const dc = useContext(DataContext);
	const [options, setOptions] = useState(DEFAULT_OPTIONS);

	const startDateString = getDateString(options.startDate);
	const endDateString = getDateString(options.endDate);

	const filteredTransactions = useMemo(() => {
		return dc.transactions.filter((transaction) => {
			if (!transaction.startDate) return false;

			if (transaction.endDate) {
				if (
					(transaction.endDate >= startDateString &&
						transaction.startDate <= startDateString) ||
					(transaction.startDate <= endDateString &&
						transaction.endDate >= endDateString) ||
					(transaction.startDate >= startDateString &&
						transaction.endDate <= endDateString)
				) {
					return true;
				}
			} else {
				if (
					startDateString <= transaction.startDate &&
					transaction.startDate <= endDateString
				) {
					return true;
				}
			}

			return false;
		});
	}, [dc.transactions, options.startDate, options.endDate]);

	const handleOptionsChange = (
		event: ChangeEvent<HTMLInputElement> | Event
	) => {
		const name = event.target.name;
		let value: string | Date | boolean = event.target.value;

		if (name === "startDate" || name === "endDate") {
			value = new Date(value as string);
		}

		setOptions((prevOptions) => ({
			...prevOptions,
			[name]: value,
		}));
	};

	const args = {
		data: filteredTransactions,
		startDate: startDateString,
		endDate: endDateString,
		options: options,
		averageDailyIncome: dc.averageDailyIncome,
	};

	return (
		<div className={style.container}>
			<section>
				<Graph data={processData(args)} options={options} />
			</section>

			<Options options={options} onChange={handleOptionsChange} />
		</div>
	);
};
