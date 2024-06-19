import {
	MouseEvent,
	useContext,
	useCallback,
	ChangeEvent,
	WheelEvent,
} from "react";

import {
	InputWithLabel,
	RadioButtonWithLabel,
	TextAreaWithLabel,
	DatalistWithLabel,
} from "../../../../components";
import { TransactionContext, DataContext } from "../../../../stores";
import { Transaction, Category, Type } from "../../../../models";
import { getAttributeNameAndKey } from "./helpers";

import style from "./style.module.css";
import { TransactionKeyValuePair } from "../../../../stores/TransactionContext";

type FormNames = {
	startDate: string;
	endDate: string;
	paidInAdvance: string;
	type: string;
	category: string;
	recurs: string;
	amount: string;
	notes: string;
};

type Props = {
	transaction: Transaction;
	onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const TransactionForm = (props: Props) => {
	const { transaction, onButtonClick } = props;

	const tc = useContext(TransactionContext);
	const dc = useContext(DataContext);
	const categories = dc.categories;
	const types = dc.types;

	const identifier = transaction.identifier;
	const names: FormNames = {
		["startDate"]: `startDate_${identifier}`,
		["endDate"]: `endDate_${identifier}`,
		["paidInAdvance"]: `paidInAdvance_${identifier}`,
		["type"]: `type_${identifier}`,
		["category"]: `category_${identifier}`,
		["recurs"]: `recurs_${identifier}`,
		["amount"]: `amount_${identifier}`,
		["notes"]: `notes_${identifier}`,
	};

	const handleTypeChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const target = event.target;
			const value = types.filter(
				(type) => type.id === Number.parseInt(target.value)
			)[0];

			const [attributeName, key] = getAttributeNameAndKey(target.name);

			const updates: TransactionKeyValuePair = {
				category: null,
				recurs: false,
				[attributeName]: value,
			};
			tc.updateNewTransaction(updates, key);
		},
		[types]
	);

	const handleCategoryChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const target = event.target;
			const [attributeName, key] = getAttributeNameAndKey(target.name);
			let value = target.value;

			let category: Category | null = null;
			if (value) {
				const matchingCategory = categories.filter(
					(category) => category.name === value
				)[0];
				if (!matchingCategory) {
					category = new Category(0, target.value, transaction.type);
				} else {
					category = matchingCategory;
				}
			}

			const updates: TransactionKeyValuePair = {
				[attributeName]: category,
			};

			if (category && category.name === "Job") {
				updates["recurs"] = true;
			}

			tc.updateNewTransaction(updates, key);
		},
		[categories, transaction]
	);

	const handleRecursChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const [attributeName, key] = getAttributeNameAndKey(target.name);

		const booleanAttributes = ["recurs", "paidInAdvance"];
		const updates: TransactionKeyValuePair = {
			[attributeName]: booleanAttributes.includes(attributeName)
				? target.value === 'Yes'
				: target.value,
		};

		tc.updateNewTransaction(updates, key);
	};

	const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		let value = target.value;

		const [attributeName, key] = getAttributeNameAndKey(target.name);
		const pattern = /^[0-9]+$/;
		const updates: TransactionKeyValuePair = {
			[attributeName]: pattern.test(value) ? Number.parseInt(value) : value,
		};

		tc.updateNewTransaction(updates, key);
	};

	const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const target = event.target;

		const [attributeName, key] = getAttributeNameAndKey(target.name);
		const updates: TransactionKeyValuePair = {
			[attributeName]: target.value,
		};

		tc.updateNewTransaction(updates, key);
	};

	const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
		// @ts-ignore
		event.target.blur();
	};

	return (
		<>
			<form className={style.transactionForm}>
				<div className={style.firstColumn}>
					<TypeSelection
						name={names["type"]}
						transaction={transaction}
						onChange={handleTypeChange}
						types={types}
					/>

					<DatalistWithLabel
						id={names["category"]}
						name={names["category"]}
						text="Category:"
						items={categories.filter(
							(category) => category.type.id === transaction.type.id
						)}
						value={transaction.category ? transaction.category.name : null}
						onChange={handleCategoryChange}
					/>

					<RecursSelection
						names={names}
						transaction={transaction}
						onChange={handleRecursChange}
					/>

					<InputWithLabel
						id={names["amount"]}
						name={names["amount"]}
						type="number"
						text="Amount ($):"
						value={transaction.amount ?? ""}
						onChange={handleAmountChange}
						step={0.01}
						onWheel={handleWheel}
						min={0}
					/>
				</div>

				<div className={style.secondColumn}>
					<TextAreaWithLabel
						id={names["notes"]}
						name={names["notes"]}
						text="Notes:"
						className={style.textarea}
						value={transaction.notes}
						onChange={handleNotesChange}
					/>
				</div>

				<button className={style.delete} onClick={onButtonClick}>
					-
				</button>
			</form>
		</>
	);
};

type TypeSelectionProps = {
	name: string;
	transaction: Transaction;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	types: Type[];
};

const TypeSelection = (props: TypeSelectionProps) => {
	const { name, transaction, onChange, types } = props;

	return (
		<fieldset>
			<legend>Type:</legend>
			<div>
				{types.map((type) => (
					<RadioButtonWithLabel
						key={type.id}
						id={name}
						name={name}
						value={type.id}
						text={type.name}
						onChange={onChange}
						checked={transaction.type.id === type.id}
						wrapped
					/>
				))}
			</div>
		</fieldset>
	);
};

type RecursSelectionProps = {
	names: FormNames;
	transaction: Transaction;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RecursSelection = (props: RecursSelectionProps) => {
	const { names, transaction, onChange } = props;

	return (
		<>
			<fieldset>
				<legend>Recurs:</legend>
				<div>
					<RadioButtonWithLabel
						id={names["recurs"]}
						name={names["recurs"]}
						text="Yes"
						value='Yes'
						onChange={onChange}
						checked={transaction.recurs}
						wrapped
					/>

					<RadioButtonWithLabel
						id={names["recurs"]}
						name={names["recurs"]}
						text="No"
						value='No'
						onChange={onChange}
						checked={!transaction.recurs}
						wrapped
					/>
				</div>
			</fieldset>

			{transaction.recurs ? (
				<>
					<fieldset>
						<legend>Paid in advance:</legend>
						<div>
							<RadioButtonWithLabel
								id={names["paidInAdvance"]}
								name={names["paidInAdvance"]}
								text="Yes"
								value='Yes'
								onChange={onChange}
								checked={transaction.paidInAdvance}
								wrapped
							/>

							<RadioButtonWithLabel
								id={names["paidInAdvance"]}
								name={names["paidInAdvance"]}
								text="No"
								value='No'
								onChange={onChange}
								checked={!transaction.paidInAdvance}
								wrapped
							/>
						</div>
					</fieldset>
					<InputWithLabel
						id={names["startDate"]}
						name={names["startDate"]}
						type="date"
						text="Start Date:"
						value={transaction.startDate ?? ""}
						onChange={onChange}
					/>
					<InputWithLabel
						id={names["endDate"]}
						name={names["endDate"]}
						type="date"
						text="End Date:"
						value={transaction.endDate ?? ""}
						onChange={onChange}
					/>
				</>
			) : (
				<InputWithLabel
					id={names["startDate"]}
					name={names["startDate"]}
					type="date"
					text="Date:"
					value={transaction.startDate ?? ""}
					onChange={onChange}
				/>
			)}
		</>
	);
};
