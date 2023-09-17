import { createContext } from "react";

const DataContext = createContext({
    transactions: [],
    goals: [],
    categories: [],
    types: [],
    addTransactions: () => {}
});

export default DataContext;