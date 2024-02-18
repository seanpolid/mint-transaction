import { Category, Transaction, Type } from "../models";
import { TransactionDTO } from "../dtos";
import { asTitleCase } from "./functions";

const mapToTransaction = (transactionDTO) => {
    const category = mapToCategory(transactionDTO.category);

    return new Transaction(
        transactionDTO.id,
        transactionDTO.identifier,
        category.type,
        category,
        transactionDTO.startDate,
        transactionDTO.endDate,
        transactionDTO.amount,
        transactionDTO.notes,
        transactionDTO.identifier
    );
}

const mapToTransactionDTO = (transaction) => {
    return new TransactionDTO(
        transaction.id,
        transaction.identifier,
        transaction.amount,
        transaction.startDate,
        transaction.endDate,
        transaction.notes,
        transaction.category
    );
}

const mapToType = (typeDTO) => {
    return new Type(
        typeDTO.id,
        asTitleCase(typeDTO.name)
    );
}

const mapToCategory = (categoryDTO) => {
    const type = mapToType(categoryDTO.type);
    type.name = asTitleCase(type.name);

    return new Category(
        categoryDTO.id,
        asTitleCase(categoryDTO.name),
        type
    );
}

export default { 
    mapToTransaction: mapToTransaction,
    mapToType: mapToType,
    mapToCategory: mapToCategory,
    mapToTransactionDTO: mapToTransactionDTO
};