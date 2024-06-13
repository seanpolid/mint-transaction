import { createContext } from "react";

const DataContext = createContext({
    categories: [],
    addNewCategories: () => {},
    
    types: [],

    transactions: [],
    setTransactions: () => {},

    forecasts: [],
    setForecasts: () => {},

    averageDailyIncome: 0
})

export default DataContext