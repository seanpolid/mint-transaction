import { Category, Transaction, Type } from "../models";
import { TransactionDTO, CategoryDTO, TypeDTO } from "../dtos";
import { asTitleCase } from "./functions";

const mapToTransaction = (transactionDTO: TransactionDTO) => {
	const category = mapToCategory(transactionDTO.category);

	return new Transaction(
		transactionDTO.id,
		transactionDTO.identifier,
		category.type,
		category,
		Boolean(transactionDTO.endDate),
		transactionDTO.startDate,
		transactionDTO.endDate,
		transactionDTO.paidInAdvance,
		transactionDTO.amount,
		transactionDTO.notes,
		transactionDTO.identifier
	);
};

const mapToTransactionDTO = (transaction: Transaction) => {
	return {
		id: transaction.id,
		identifier: transaction.identifier,
		amount: transaction.amount,
		startDate: transaction.startDate,
		endDate: transaction.endDate,
		paidInAdvance: transaction.paidInAdvance,
		notes: transaction.notes,
		category: transaction.category,
	};
};

const mapToType = (typeDTO: TypeDTO) => {
	return new Type(typeDTO.id, asTitleCase(typeDTO.name));
};

const mapToCategory = (categoryDTO: CategoryDTO) => {
	const type = mapToType(categoryDTO.type);
	type.name = asTitleCase(type.name);

	return new Category(categoryDTO.id, asTitleCase(categoryDTO.name), type);
};

export const mapper = {
	mapToTransaction: mapToTransaction,
	mapToType: mapToType,
	mapToCategory: mapToCategory,
	mapToTransactionDTO: mapToTransactionDTO,
};
