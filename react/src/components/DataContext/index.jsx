import { createContext } from "react";

const DataContext = createContext({
    selectedTransaction: null,
    transactions: [],
    goals: [],
    categories: [],
    types: [],
    addTransactions: () => {},
    removeTransaction: () => {},
    updateTransaction: () => {}
});

export default DataContext;