import { useState, useEffect, useCallback } from "react";

import { Transaction } from "../../../models";
import { getDateToDisplay } from "../functions";
import { HandleSelection } from "..";

import logStyle from "../style.module.css";
import style from "./style.module.css";

type Props = {
	transaction: Transaction;
	onClick: HandleSelection;
	selectedId: number | null;
};

export const TransactionLog = (props: Props) => {
	const { transaction, onClick, selectedId } = props;

	const [className, setClassName] = useState(`${style.transaction}`);

	useEffect(() => {
		if (transaction.id === selectedId) {
			setClassName(`${style.transaction} ${logStyle.active}`);
		} else {
			setClassName(`${style.transaction}`);
		}
	}, [selectedId]);

	const handleMouseEnter = () => {
		setClassName(`${style.transaction} ${logStyle.active}`);
	};

	const handleMouseLeave = useCallback(() => {
		if (transaction.id !== selectedId) {
			setClassName(`${style.transaction}`);
		}
	}, [transaction, selectedId]);

	return (
		<tr
			key={transaction.identifier}
			data-identifier={transaction.identifier}
			className={className}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={() => onClick(transaction, true)}
		>
			<td>
				<span className={style.type}>{transaction.category?.type.name}</span>
				<span className={style.category}>{transaction.category?.name}</span>
				<span className={style.date}>{getDateToDisplay(transaction)}</span>
			</td>
			<td className={style.amount}>${transaction.amount}</td>
		</tr>
	);
};
