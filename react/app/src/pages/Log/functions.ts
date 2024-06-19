import { Transaction, Category, Forecast } from "../../models";
import { Sort, Order } from "../../enums";
import { compareString } from "../../utils/functions";

/**
 * Compares two dates and returns the value necessary to sort in
 * either ascending or descending order
 * @param {*} date1
 * @param {*} date2
 * @param {*} ascending
 * @returns
 */
export const compareDate = (date1String: string, date2String: string) => {
	const date1 = new Date(date1String);
	const date2 = new Date(date2String);

	if (date1 < date2) {
		return -1;
	} else if (date1 === date2) {
		return 0;
	} else {
		return 1;
	}
};

export const compareAmount = (
	amount1: number | null,
	amount2: number | null
) => {
	if (!amount1 || !amount2) return 0;
	if (!amount1) return 1;
	if (!amount2) return -1;

	return amount1 - amount2;
};

export function getDateToDisplay(transaction: Transaction) {
	if (!transaction.paidInAdvance && transaction.endDate) {
		return transaction.endDate;
	}

	return transaction.startDate;
}

export function compareTransactions(
	sortTerm: Sort,
	sortOrder: Order,
	t1: Transaction,
	t2: Transaction
) {
	const multiplier = sortOrder === Order.Ascending ? 1 : -1;

	const compare = {
		[Sort.Category]: () =>
			compareByCategory(t1.category, t2.category, multiplier),
		[Sort.Date]: () => compareByDate(t1, t2, multiplier),
		[Sort.Amount]: () => compareAmount(t1.amount, t2.amount) * multiplier,
	};

	return compare[sortTerm]();
}

export function compareByCategory(
	c1: Category | null,
	c2: Category | null,
	multiplier: number
) {
	if (!c1 && !c2) return 0;
	if (!c1) return 1;
	if (!c2) return -1;

	return compareString(c1.name, c2.name) * multiplier;
}

export function compareByDate(
	t1: Transaction,
	t2: Transaction,
	multiplier: number
) {
	const t1Date = t1.endDate && !t1.paidInAdvance ? t1.endDate : t1.startDate;
	const t2Date = t2.endDate && !t2.paidInAdvance ? t2.endDate : t2.startDate;

	if (!t1Date && !t2Date) return 0;
	if (!t1Date) return 1;
	if (!t2Date) return -1;

	return compareDate(t1Date, t2Date) * multiplier;
}

export function compareForecasts(
	sortTerm: Sort,
	sortOrder: Order,
	f1: Transaction | Forecast,
	f2: Transaction | Forecast
) {
	return 0;
}
