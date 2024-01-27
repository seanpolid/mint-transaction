import ApiContext from "./ApiContext";
import endpointType from "../enums/endpointType";
import mapper from "../utils/mapper";
import StatusContext from "./StatusContext";
import TransactionContext from "./TransactionContext";
import { Transaction } from "../models";
import { useContext, useEffect, useState, useCallback } from "react";
import { v4 } from "uuid";

const TransactionContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [newTransactions, setNewTransactions] = useState([]);
    const sc = useContext(StatusContext);
    const api = useContext(ApiContext);

    useEffect(() => {
        const loadData = async () => {
            sc.incrementLoadingData();

            const loadedTransactions = await getTransactions(api);
            const loadedTypes = await getTypes(api);
            const loadedCategories = await getCategories(api);

            setTransactions(loadedTransactions);
            setTypes(loadedTypes);
            setCategories(loadedCategories);

            const transaction = createTransaction(loadedTypes);
            setNewTransactions([transaction]);

            sc.decrementLoadingData();
        }

        loadData();
    }, []);

    useEffect(() => {
        if (transactions.length === 0) {
            setSelectedTransaction(null);
        } else {
            if (selectedTransaction === null) {
                setSelectedTransaction(transactions[0]);
            }
        }
    }, [transactions]);
    
    const deleteTransaction = (id) => {
        setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
    }
    
    const updateTransaction = (updatedTransaction) => {
        setTransactions(prevTransactions => prevTransactions.map(prevTransaction => {
            if (prevTransaction.id === updatedTransaction.id) {
                return updatedTransaction;
            } else {
                return prevTransaction;
            }
        }))
    }

    const updateNewTransaction = (attributeName, value, key) => {
        setNewTransactions(prevNewTransactions => prevNewTransactions.map(transaction => {
            console.log(attributeName, value, key);
            if (transaction.identifier === key) {
                const clonedTransaction = transaction.clone();
                clonedTransaction[attributeName] = value;
                return clonedTransaction;
            } else {
                return transaction;
            }
        }))
    };

    const deleteNewTransaction = (identifier) => {
        setNewTransactions(prevNewTransactions => 
            prevNewTransactions.filter(transaction => transaction.identifier !== identifier));
    }

    const addNewTransaction = useCallback(() => {
        setNewTransactions(prevNewTransactions => prevNewTransactions.concat(createTransaction(types)))
    }, [types]);

    const saveNewTransactions = useCallback(async () => {
        const newTransactionDTOs = newTransactions.map(newTransaction => mapper.mapToTransactionDTO(newTransaction));
        const savedTransactionDTOs = api.postData(endpointType.TRANSACTIONS, newTransactionDTOs);
        
        if (savedTransactionDTOs.length > 0) {
            const savedTransactions = savedTransactionDTOs.map(savedTransactionDTO => mapper.mapToTransaction(savedTransactionDTO));

            setNewTransactions([createTransaction(types)]);
            setTransactions(prevTransactions => prevTransactions.concat(savedTransactions));
        }
    }, [newTransactions, types]);

    const data = {
        categories: categories,
        types: types,

        transactions: transactions,
        deleteTransaction: deleteTransaction,
        updateTransaction: updateTransaction,

        selectedTransaction: selectedTransaction,
        setSelectedTransaction: setSelectedTransaction,

        newTransactions: newTransactions,
        updateNewTransaction: updateNewTransaction,
        deleteNewTransaction: deleteNewTransaction,
        addNewTransaction: addNewTransaction,
        saveNewTransactions: saveNewTransactions
    }

    return (
        <TransactionContext.Provider value={data}>
            {children}
        </TransactionContext.Provider>
    )
}

function createTransaction(types) {
    const transaction = new Transaction();

    const uuid = v4();
    transaction.id = 0;
    transaction.key = uuid;
    transaction.identifier = uuid;
    transaction.recurs = false;

    if (types.length > 0) {
        const defaultType = types.filter(type => type.name.toLowerCase() === "expense")[0];
        if (defaultType) {
            transaction.type = defaultType;
        }
    }

    return transaction;
}

async function getTransactions(api) {
    const transactionDTOs = await api.getData(endpointType.TRANSACTIONS);
    
    const transactions = [];
    for (const transactionDTO of transactionDTOs) {
        const transaction = mapper.mapToTransaction(transactionDTO);
        transactions.push(transaction);
    }

    return transactions;
}

async function getTypes(api) {
    const typeDTOs = await api.getData(endpointType.TYPES);

    const types = [];
    for (const typeDTO of typeDTOs) {
        const type = mapper.mapToType(typeDTO);
        types.push(type);
    }

    return types;
}

async function getCategories(api) {
    const categoryDTOs = await api.getData(endpointType.CATEGORIES);

    const categories = [];
    for (const categoryDTO of categoryDTOs) {
        const category = mapper.mapToCategory(categoryDTO);
        categories.push(category);
    }

    return categories;
}

export default TransactionContextProvider