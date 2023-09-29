import { createContext } from "react";

const DataContext = createContext({
    selectedTransaction: null,
    transactions: [],
    goals: [],
    categories: [],
    types: [],
    addTransactions: () => {}
});

export default DataContext;