import { createContext } from "react";

const DataContext = createContext({
    categories: [],
    addNewCategories: () => {},
    
    types: [],

    transactions: [],
    setTransactions: () => {},

    forecasts: [],
    setForecasts: () => {}
})

export default DataContext