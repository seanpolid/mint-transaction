import { createContext } from "react";

const TransactionContext = createContext({
    selectedTransaction: {},
    setSelectedTransaction: () => {},
    deleteSelectedTransaction: async () => {},
    updateSelectedTransaction: (attributeName, value) => {},
    saveSelectedTransactionUpdates: () => {},

    newTransactions: [],
    updateNewTransaction: (attributeName, value, key) => {},
    deleteNewTransaction: (identifier) => {},
    addNewTransaction: () => {},
    saveNewTransactions: async () => {}
})

export default TransactionContext