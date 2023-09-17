import { Category, Transaction, Type } from "../models";
import { TransactionDTO } from "../dtos";

const mapToTransaction = (transactionDTO) => {
    return new Transaction(
        transactionDTO.id,
        transactionDTO.identifier,
        transactionDTO.category,
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
        transaction.categoryId
    );
}

const mapToType = (typeDTO) => {
    return new Type(
        typeDTO.id,
        typeDTO.name
    );
}

const mapToCategory = (categoryDTO) => {
    return new Category(
        categoryDTO.id,
        categoryDTO.name,
        categoryDTO.typeId
    );
}

export default { 
    mapToTransaction: mapToTransaction,
    mapToType: mapToType,
    mapToCategory: mapToCategory,
    mapToTransactionDTO: mapToTransactionDTO
};