import { useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { v4 } from "uuid";

import { postData, putData, deleteData } from "../services/ApiService";
import { Endpoint } from "../enums";
import { mapper } from "../utils/mapper";
import { TransactionDTO } from "../dtos";
import { Category, Transaction, Type } from "../models";
import { TransactionContext, Context } from "./TransactionContext";
import { TransactionKeyValuePair } from "./TransactionContext";
import { DataContext } from "./DataContext";

type Props = {
	children: ReactNode;
	value?: Transaction; // For testing
};

/**
 * Manages all transactions that are a work in progess (i.e., not saved or being temporarily saved).
 */
export const TransactionContextProvider = (props: Props) => {
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(props.value ? props.value : null);
	const [newTransactions, setNewTransactions] = useState<Transaction[]>([]);
	const dc = useContext(DataContext);

	useEffect(() => {
		if (newTransactions.length === 0 && dc.types.length > 0) {
			setNewTransactions([createTransaction(dc.types)]);
		}
	}, [dc.types]);

	const deleteSelectedTransaction = useCallback(async () => {
		if (!selectedTransaction) return true;

		const successful = await deleteData(
			Endpoint.Transactions,
			selectedTransaction.id
		);

		if (successful) {
			const filteredTransactions = dc.transactions.filter(
				(transaction) => transaction.id !== selectedTransaction.id
			);

			dc.setTransactions(filteredTransactions);
			setSelectedTransaction(null);
		}

		return successful;
	}, [selectedTransaction, dc.transactions]);

	const updateSelectedTransaction = useCallback(
		(updates: TransactionKeyValuePair) => {
			if (!selectedTransaction) return;

			const updatedTransaction = updateTransaction(
				updates,
				selectedTransaction
			);
			setSelectedTransaction(updatedTransaction);
		},
		[selectedTransaction]
	);

	const saveSelectedTransactionUpdates = useCallback(async () => {
		if (!selectedTransaction) return true;

		const selectedTransactionDTO =
			mapper.mapToTransactionDTO(selectedTransaction);
		const successful = await putData(
			Endpoint.Transactions,
			selectedTransactionDTO
		);

		if (successful) {
			dc.updateTransaction(selectedTransaction);
		}

		return successful;
	}, [selectedTransaction]);

	const updateNewTransaction = (
		updates: TransactionKeyValuePair,
		key: string
	) => {
		setNewTransactions((prevNewTransactions) => {
			return prevNewTransactions.map((transaction) => {
				if (transaction.identifier === key) {
					return updateTransaction(updates, transaction);
				} else {
					return transaction;
				}
			});
		});
	};

	const deleteNewTransaction = (identifier: string) => {
		setNewTransactions((prevNewTransactions) =>
			prevNewTransactions.filter(
				(transaction) => transaction.identifier !== identifier
			)
		);
	};

	const addNewTransaction = useCallback(() => {
		setNewTransactions((prevNewTransactions) =>
			prevNewTransactions.concat(createTransaction(dc.types))
		);
	}, [dc.types]);

	const saveNewTransactions = useCallback(async () => {
		const newTransactionDTOs = newTransactions.map((newTransaction) =>
			mapper.mapToTransactionDTO(newTransaction)
		);

		const savedTransactionDTOs = await postData<TransactionDTO[]>(
			Endpoint.Transactions,
			newTransactionDTOs
		);
		if (!savedTransactionDTOs) {
			return false;
		}

		if (savedTransactionDTOs.length > 0) {
			const savedTransactions = savedTransactionDTOs.map(
				(savedTransactionDTO) => mapper.mapToTransaction(savedTransactionDTO)
			);

			const newCategories: Category[] = [];
			for (const newTransactionDTO of newTransactionDTOs) {
				if (newTransactionDTO.category && newTransactionDTO.category.id === 0) {
					newCategories.push(newTransactionDTO.category);
				}
			}

			if (newCategories.length > 0) {
				const newSavedCategories = [];
				for (const transaction of savedTransactions) {
					if (!transaction.category) continue;

					const newSavedCategory = newCategories.find(
						(category) => category.name === transaction.category?.name
					);

					if (newSavedCategory) {
						newSavedCategories.push(transaction.category);
					}
				}

				dc.addNewCategories(newSavedCategories);
			}

			dc.addTransactions(savedTransactions);
		}

		setNewTransactions([createTransaction(dc.types)]);

		return true;
	}, [newTransactions, dc.types]);

	const data: Context = {
		selectedTransaction: selectedTransaction,
		setSelectedTransaction: setSelectedTransaction,
		deleteSelectedTransaction: deleteSelectedTransaction,
		updateSelectedTransaction: updateSelectedTransaction,
		saveSelectedTransactionUpdates: saveSelectedTransactionUpdates,

		newTransactions: newTransactions,
		updateNewTransaction: updateNewTransaction,
		deleteNewTransaction: deleteNewTransaction,
		addNewTransaction: addNewTransaction,
		saveNewTransactions: saveNewTransactions,
	};

	return (
		<TransactionContext.Provider value={data}>
			{props.children}
		</TransactionContext.Provider>
	);
};

function updateTransaction(
	updates: TransactionKeyValuePair,
	transaction: Transaction
): Transaction {
	const clonedTransaction: any = transaction.clone();

	for (const [key, value] of Object.entries(updates)) {
		clonedTransaction[key] = value;
	}

	return clonedTransaction as Transaction;
}

function createTransaction(types: Type[]) {
	const uuid = v4();

	let defaultType = types[0];
	if (types.length > 0) {
		defaultType = types.filter(
			(type) => type.name.toLowerCase() === "expense"
		)[0];
	}

	return new Transaction(
		0,
		uuid,
		defaultType,
		null,
		false,
		null,
		null,
		false,
		null,
		"",
		uuid
	);
}
