import { createContext } from "react";

const TransactionContext = createContext({
    categories: [],
    types: [],

    transactions: [],
    deleteTransaction: () => {},
    updateTransaction: () => {},
    
    selectedTransaction: {},
    setSelectedTransaction: () => {},

    newTransactions: [],
    updateNewTransaction: (attributeName, value, key) => {},
    deleteNewTransaction: (identifier) => {},
    addNewTransaction: () => {},
    saveNewTransactions: () => {}
})

export default TransactionContext