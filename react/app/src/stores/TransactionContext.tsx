import { createContext } from "react";

import { Transaction } from "../models";

type KeyValuePair<T> = {
	[K in keyof T]?: T[K];
};

export type TransactionKeyValuePair = Omit<
	KeyValuePair<Transaction>,
	"toString" | "clone" | "key"
>;

export type Context = {
	selectedTransaction: Transaction | null;
	setSelectedTransaction: (selectedTransaction: Transaction) => void;
	deleteSelectedTransaction: () => Promise<boolean>;
	updateSelectedTransaction: (updates: TransactionKeyValuePair) => void;
	saveSelectedTransactionUpdates: () => Promise<boolean>;

	newTransactions: Transaction[];
	updateNewTransaction: (updates: TransactionKeyValuePair, key: string) => void;
	deleteNewTransaction: (identifier: string) => void;
	addNewTransaction: () => void;
	saveNewTransactions: () => Promise<boolean>;
};

const defaultContext: Context = {
	selectedTransaction: null,
	setSelectedTransaction: () => {},
	deleteSelectedTransaction: async () => false,
	updateSelectedTransaction: (updates: TransactionKeyValuePair) => {},
	saveSelectedTransactionUpdates: async () => false,

	newTransactions: [],
	updateNewTransaction: (updates: TransactionKeyValuePair, key: string) => {},
	deleteNewTransaction: (identifier: string) => {},
	addNewTransaction: () => {},
	saveNewTransactions: async () => false,
};

export const TransactionContext = createContext<Context>(defaultContext);
