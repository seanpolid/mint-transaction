import ApiContext from "./ApiContext";
import endpointType from "../enums/endpointType";
import { getData } from "../utils/functions";
import mapper from "../utils/mapper";
import StatusContext from "./StatusContext";
import TransactionContext from "./TransactionContext";
import { useContext, useEffect, useState, useCallback } from "react";

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
    
    const removeTransaction = (id) => {
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

    const saveNewTransactions = useCallback(() => {

        setTransactions(prevTransactions => prevTransactions.concat(newTransactions));
        setNewTransactions([]);
    }, [newTransactions]);

    const data = {
        categories: categories,
        types: types,

        transactions: transactions,
        removeTransaction: removeTransaction,
        updateTransaction: updateTransaction,

        selectedTransaction: selectedTransaction,

        newTransactions: newTransactions,
        saveNewTransactions: saveNewTransactions
    }

    return (
        <TransactionContext.Provider value={data}>
            {children}
        </TransactionContext.Provider>
    )
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