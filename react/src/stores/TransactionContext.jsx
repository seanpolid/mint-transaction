import { createContext } from "react";

const TransactionContext = createContext({
    categories: [],
    types: [],

    transactions: [],
    removeTransaction: () => {},
    updateTransaction: () => {},
    
    selectedTransaction: {},

    newTransactions: [],
    saveNewTransactions: () => {}
})

export default TransactionContext