import { ChangeEvent, useContext, MouseEvent } from "react";

import { extractCurrency } from "../../../utils/functions";
import { DataContext, TransactionContext } from "../../../stores";
import { InputWithLabel, TextAreaWithLabel } from "../../../components";

import style from "../style.module.css";
import { TransactionKeyValuePair } from "../../../stores/TransactionContext";
import { SelectWithItems } from "../../../components/SelectWithItems";

export const TransactionPage = () => {
	const tc = useContext(TransactionContext);
	const dc = useContext(DataContext);
	const categories = dc.categories;
	const transaction = tc.selectedTransaction;

	const names = {
		category: "category",
		startDate: "startDate",
		endDate: "endDate",
		amount: "amount",
		notes: "notes",
		paidInAdvance: "paidInAdvance",
	};

	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const target = event.target;

		const attributeName = target.name;
		const value = Number.parseInt(target.value);

		const category = categories.filter((category) => category.id === value)[0];

		const updates: TransactionKeyValuePair = {
			[attributeName]: category,
		};

		tc.updateSelectedTransaction(updates);
	};

	const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;

		const attributeName = target.name;
		const value = target.value;

		const updates: TransactionKeyValuePair = {
			[attributeName]: value,
		};

		tc.updateSelectedTransaction(updates);
	};

	const handleAmountChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const target = event.target;

		const attributeName = target.name;
		let value = target.value;

		const currency = extractCurrency(value);
		if (!currency) {
			value = "0";
		} else {
			value = currency;
			if (value[0] === "0" && (value.length == 1 || value[1] != ".")) {
				value = value.substring(1);
			}
		}

		const updates: TransactionKeyValuePair = {
			[attributeName]: value,
		};

		tc.updateSelectedTransaction(updates);
	};

	const handlePaidInAdvanceChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;

		const attributeName = target.name;
		const updates: TransactionKeyValuePair = {
			[attributeName]: target.checked,
		};

		tc.updateSelectedTransaction(updates);
	};

	const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const target = event.target;

		const attributeName = target.name;
		const updates: TransactionKeyValuePair = {
			[attributeName]: target.value,
		};

		tc.updateSelectedTransaction(updates);
	};

	const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const successful = await tc.deleteSelectedTransaction();
		if (!successful) {
			console.log("Failed to delete transaction");
		}
	};

	const handleUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const successful = tc.saveSelectedTransactionUpdates();
		if (!successful) {
			console.log("Failed to update transaction");
		}
	};

	return (
		<>
			{transaction === null ? (
				<section className={style.header}>
					<h1>No transactions to view.</h1>
				</section>
			) : (
				<section>
					<form className={style.form}>
						<div className={style.topLeft}>
							<h1>{transaction.category?.type.name}</h1>
							<SelectWithItems
								id={names.category}
								name={names.category}
								items={categories.filter(
									(category) =>
										category.type.id === transaction.category?.type.id
								)}
								value={transaction.category ? transaction.category.id : null}
								onChange={handleCategoryChange}
							/>
						</div>

						<div className={style.topRight}>
							<InputWithLabel
								id={names.startDate}
								name={names.startDate}
								type="date"
								text={transaction.endDate === null ? "Date:" : "Start Date:"}
								value={transaction.startDate || ""}
								onChange={handleDateChange}
							/>
							{transaction.endDate === null ? null : (
								<>
									<InputWithLabel
										id={names.endDate}
										name={names.endDate}
										type="date"
										text="End Date:"
										value={transaction.endDate}
										onChange={handleDateChange}
									/>
									<InputWithLabel
										id={names.paidInAdvance}
										name={names.paidInAdvance}
										type="checkbox"
										text="Paid in advance:"
										checked={transaction.paidInAdvance ? true : false}
										onChange={handlePaidInAdvanceChange}
									/>
								</>
							)}
						</div>

						<div className={style.amount}>
							<input
								name={names.amount}
								type="text"
								value={`$${transaction.amount}`}
								onChange={handleAmountChange}
							/>
						</div>

						<div className={style.notes}>
							<TextAreaWithLabel
								id={names.notes}
								name={names.notes}
								text="Notes:"
								value={transaction.notes}
								onChange={handleTextAreaChange}
							/>
						</div>

						<div className={style.buttons}>
							<button className="button" onClick={handleDelete}>
								Delete
							</button>
							<button className="button" onClick={handleUpdate}>
								Update
							</button>
						</div>
					</form>
				</section>
			)}
		</>
	);
};
