import apiService from "../services/ApiService";
import endpointType from "../enums/endpointType";
import mapper from "../utils/mapper";
import TransactionContext from "./TransactionContext";
import { Transaction } from "../models";
import { useContext, useEffect, useState, useCallback } from "react";
import { v4 } from "uuid";
import DataContext from "./DataContext";

/**
 * Manages all transactions that are a work in progess (i.e., not saved or being temporarily saved).
 * @param {*} param0 
 * @returns 
 */
const TransactionContextProvider = ({children, value}) => {
    const [selectedTransaction, setSelectedTransaction] = useState(value ? value : null);
    const [newTransactions, setNewTransactions] = useState([]);
    const dc = useContext(DataContext);

    useEffect(() => {
        if (newTransactions.length === 0 && dc.types.length > 0) {
            setNewTransactions([createTransaction(dc.types)]);
        }
    }, [dc.types]);
    
    const deleteSelectedTransaction = useCallback(async () => {
        const successful = await apiService.deleteData(endpointType.TRANSACTIONS, selectedTransaction.id);

        if (successful) {
            const filteredTransactions = dc.transactions.filter(transaction => transaction.id !== selectedTransaction.id);

            dc.setTransactions(filteredTransactions);
            setSelectedTransaction(null);
        }
        
        return successful;
    }, [selectedTransaction, dc.transactions]);
    
    const updateSelectedTransaction = useCallback((attributeName, value) => {
        const clonedSelectedTransaction = selectedTransaction.clone();
        clonedSelectedTransaction[attributeName] = value;
        
        setSelectedTransaction(clonedSelectedTransaction);
    }, [selectedTransaction]);

    const saveSelectedTransactionUpdates = useCallback(async () => {
        const selectedTransactionDTO = mapper.mapToTransactionDTO(selectedTransaction);
        const successful = await apiService.putData(endpointType.TRANSACTIONS, selectedTransactionDTO);

        if (successful) {
            dc.setTransactions(prevTransactions => prevTransactions.map(transaction => {
                if (transaction.id === selectedTransaction.id) {
                    return selectedTransaction;
                } else {
                    return transaction;
                }
            }))
        }

        return successful;
    }, [selectedTransaction]);

    const updateNewTransaction = (attributeName, value, key) => {
        setNewTransactions(prevNewTransactions => prevNewTransactions.map(transaction => {
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
        setNewTransactions(prevNewTransactions => prevNewTransactions.concat(createTransaction(dc.types)))
    }, [dc.types]);

    const saveNewTransactions = useCallback(async () => {
        const newTransactionDTOs = newTransactions.map(newTransaction => mapper.mapToTransactionDTO(newTransaction));
        const savedTransactionDTOs = await apiService.postData(endpointType.TRANSACTIONS, newTransactionDTOs);
        
        if (savedTransactionDTOs.length > 0) {
            const savedTransactions = savedTransactionDTOs.map(savedTransactionDTO => mapper.mapToTransaction(savedTransactionDTO));

            setNewTransactions([createTransaction(dc.types)]);
            dc.setTransactions(prevTransactions => savedTransactions.concat(prevTransactions));
        }
    }, [newTransactions, dc.types]);

    const data = {
        selectedTransaction: selectedTransaction,
        setSelectedTransaction: setSelectedTransaction,
        deleteSelectedTransaction: deleteSelectedTransaction,
        updateSelectedTransaction: updateSelectedTransaction,
        saveSelectedTransactionUpdates: saveSelectedTransactionUpdates,

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



export default TransactionContextProvider