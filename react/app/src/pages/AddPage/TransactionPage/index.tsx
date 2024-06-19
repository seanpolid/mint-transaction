import { useCallback, useContext, MouseEvent } from "react";

import { TransactionContext } from "../../../stores";
import { Scrollpane } from "../../../components";
import { TransactionForm } from "./TransactionForm";

import style from "./style.module.css";

export const TransactionPage = () => {
	const tc = useContext(TransactionContext);

	const handleDelete = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const target = event.target;
			if (target instanceof HTMLElement) {
				const key = target.parentElement?.getAttribute("data-key");

				if (key && tc.newTransactions.length > 1) {
					tc.deleteNewTransaction(key);
				}
			}
		},
		[tc.newTransactions]
	);

	const handleAdd = useCallback(
		(event: MouseEvent) => {
			event.preventDefault();
			tc.addNewTransaction();
		},
		[tc.addNewTransaction]
	);

	const handleSave = useCallback(
		async (event: MouseEvent) => {
			event.preventDefault();
			tc.saveNewTransactions();
		},
		[tc.saveNewTransactions]
	);

	return (
		<Scrollpane className={style.transactionContainer}>
			<ul>
				{tc.newTransactions.map((transaction) => (
					<li key={transaction.identifier} data-key={transaction.identifier}>
						<TransactionForm
							transaction={transaction}
							onButtonClick={handleDelete}
						/>
					</li>
				))}
			</ul>

			<div className={style.options}>
				<button className="button" onClick={handleAdd}>
					Add
				</button>
				<button className="button" onClick={handleSave}>
					Save
				</button>
			</div>
		</Scrollpane>
	);
};
