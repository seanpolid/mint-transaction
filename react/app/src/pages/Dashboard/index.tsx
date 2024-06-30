import { useContext, useMemo, ChangeEvent } from "react";

import { DataContext } from "../../stores/DataContext";
import { Event } from "../../components/ToggleButtonWithLabel";
import { Options } from "./Options";
import { Graph } from "./Graph";
import { processData, getDateString } from "./helpers";

import style from "./style.module.css";
import { DashboardContext } from "../../stores/DashboardContext";

export const Dashboard = () => {
	const dataContext = useContext(DataContext);
	const dashboardContext = useContext(DashboardContext);

	const options = dashboardContext.options;

	const startDateString = getDateString(options.startDate);
	const endDateString = getDateString(options.endDate);

	const filteredTransactions = useMemo(() => {
		return dataContext.transactions.filter((transaction) => {
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
	}, [dataContext.transactions, options.startDate, options.endDate]);

	const handleOptionsChange = (
		event: ChangeEvent<HTMLInputElement> | Event
	) => {
		const name = event.target.name;
		let value: string | Date | boolean = event.target.value;

		if (name === "startDate" || name === "endDate") {
			value = new Date(value as string);
		}
	
		dashboardContext.updateOptions(name, value);
	};

	const args = {
		data: filteredTransactions,
		startDate: startDateString,
		endDate: endDateString,
		options: dashboardContext.options,
		averageDailyIncome: dataContext.averageDailyIncome,
	};

	return (
		<div className={style.container}>
			<section>
				<Graph data={processData(args)} />
			</section>

			<Options options={options} onChange={handleOptionsChange} />
		</div>
	);
};
