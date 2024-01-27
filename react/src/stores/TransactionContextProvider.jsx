import ApiContext from "./ApiContext";
import endpointType from "../enums/endpointType";
import mapper from "../utils/mapper";
import TransactionContext from "./TransactionContext";
import { Transaction } from "../models";
import { useContext, useEffect, useState, useCallback } from "react";
import { v4 } from "uuid";
import DataContext from "./DataContext";

/**
 * Manages all transactions that are a work in progess (i.e., not saved).
 * @param {*} param0 
 * @returns 
 */
const TransactionContextProvider = ({children}) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [newTransactions, setNewTransactions] = useState([]);
    const api = useContext(ApiContext);
    const dc = useContext(DataContext);

    useEffect(() => {
        if (newTransactions.length === 0 && dc.types.length > 0) {
            setNewTransactions([createTransaction(dc.types)]);
        }
    }, [dc.types]);

    useEffect(() => {
        if (dc.transactions.length === 0) {
            setSelectedTransaction(null);
        }
    }, [dc.transactions]);
    
    const deleteSelectedTransaction = useCallback(async () => {
        const successful = await api.deleteData(endpointType.TRANSACTIONS, selectedTransaction.id);

        if (successful) {
            dc.setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== selectedTransaction.id));
            setSelectedTransaction(null);
        }
        
        return successful;
    }, [selectedTransaction]);
    
    const updateSelectedTransaction = useCallback((attributeName, value) => {
        const clonedSelectedTransaction = selectedTransaction.clone();
        clonedSelectedTransaction[attributeName] = value;
        
        setSelectedTransaction(clonedSelectedTransaction);
    }, [selectedTransaction]);

    const saveSelectedTransactionUpdates = useCallback(() => {
        const selectedTransactionDTO = mapper.mapToTransactionDTO(selectedTransaction);
        const successful = api.putData(endpointType.TRANSACTIONS, selectedTransactionDTO);

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
        const savedTransactionDTOs = await api.postData(endpointType.TRANSACTIONS, newTransactionDTOs);
        
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