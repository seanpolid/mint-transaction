import { createContext } from "react";

const TransactionContext = createContext({
    categories: [],
    types: [],

    transactions: [],
    addTransactions: () => {},
    removeTransaction: () => {},
    updateTransaction: () => {},
    
    selectedTransaction: {},

    newTransactions: []
})

export default TransactionContext