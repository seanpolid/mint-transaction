import { ReactNode, useState, useEffect } from "react";

import { TransactionDTO, TypeDTO, CategoryDTO } from "../dtos";
import { Transaction, Type, Category, Forecast } from "../models";
import { getData } from "../services/ApiService";
import { Endpoint } from "../enums";
import { mapper } from "../utils/mapper";
import { DataContext } from "./DataContext";

type Props = {
	children: ReactNode;
};

export const DataContextProvider = (props: Props) => {
	const [hasNetworkError, setHasNetworkError] = useState<boolean>(false);
	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [types, setTypes] = useState<Type[]>([]);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [averageDailyIncome, setAverageDailyIncome] = useState<number>(0);
	const [forecasts, setForecasts] = useState<Forecast[]>([]);

	useEffect(() => {
		const loadData = async () => {
			setIsLoadingData(true);

			const transactionsPromise = getTransactions();
			const typesPromise = getTypes();
			const categoriesPromise = getCategories();

			const loadedTransactions = await transactionsPromise;
			const loadedTypes = await typesPromise;
			const loadedCategories = await categoriesPromise;

			if (!loadedTransactions || !loadedTypes || !loadedCategories) {
				setHasNetworkError(true);
				return;
			}

			setTransactions(loadedTransactions);
			setTypes(loadedTypes);
			setCategories(
				loadedCategories.sort((c1, c2) => c1.name.localeCompare(c2.name))
			);
			setAverageDailyIncome(getAverageDailyIncome(loadedTransactions));

			setIsLoadingData(false);
		};

		loadData();
	}, []);

	const addNewCategories = (newCategories: Category[]) => {
		setCategories((prevCategories) => prevCategories.concat(newCategories));
	};

	const handleSetTransactions = (transactions: Transaction[]) => {
		setTransactions(transactions);
	};

	const updateTransaction = (transaction: Transaction) => {
		setTransactions((prevTransactions) =>
			prevTransactions.map((prevTransaction) => {
				if (prevTransaction.id === transaction.id) {
					return transaction;
				} else {
					return transaction;
				}
			})
		);
	};

	const addTransactions = (transactions: Transaction[]) => {
		setTransactions((prevTransactions) =>
			transactions.concat(prevTransactions)
		);
	};

	const handleSetForecasts = (forecasts: Forecast[]) => {
		setForecasts(forecasts);
	};

	const data = {
		hasNetworkError,
		isLoadingData,

		categories,
		addNewCategories,

		types,

		transactions,
		setTransactions: handleSetTransactions,
		updateTransaction,
		addTransactions,

		forecasts,
		setForecasts: handleSetForecasts,

		averageDailyIncome,
	};

	return (
		<DataContext.Provider value={data}>{props.children}</DataContext.Provider>
	);
};

async function getTransactions(): Promise<Transaction[] | false> {
	const transactionDTOs = await getData<TransactionDTO[]>(
		Endpoint.Transactions
	);
	if (!transactionDTOs) {
		return false;
	}

	const transactions = [];
	for (const transactionDTO of transactionDTOs) {
		const transaction = mapper.mapToTransaction(transactionDTO);
		transactions.push(transaction);
	}

	return transactions;
}

async function getTypes(): Promise<Type[] | null> {
	const typeDTOs = await getData<TypeDTO[]>(Endpoint.Types);
	if (!typeDTOs) {
		return null;
	}

	const types = [];
	for (const typeDTO of typeDTOs) {
		const type = mapper.mapToType(typeDTO);
		types.push(type);
	}

	return types;
}

async function getCategories(): Promise<Category[] | null> {
	const categoryDTOs = await getData<CategoryDTO[]>(Endpoint.Categories);
	if (!categoryDTOs) {
		return null;
	}

	const categories = [];
	for (const categoryDTO of categoryDTOs) {
		const category = mapper.mapToCategory(categoryDTO);
		categories.push(category);
	}

	return categories;
}

function getAverageDailyIncome(transactions: Transaction[]): number {
	const incomes = transactions.filter(
		(transaction) =>
			transaction.category && transaction.category.type.name === "Income"
	);

	let numDays = 0;
	let total = 0;
	for (const income of incomes) {
		if (income.startDate && income.endDate && income.amount) {
			numDays += getDifferenceInDays(income.startDate, income.endDate);
			total += income.amount;
		}
	}

	return total / numDays;
}

function getDifferenceInDays(dateString1: string, dateString2: string): number {
	const differenceInTime =
		new Date(dateString2).getTime() -
		new Date(dateString1).getTime() +
		24 * 3600 * 1000;
	const differenceInDays = differenceInTime / (1000 * 3600 * 24);

	return differenceInDays;
}
