import { createContext } from "react";

const DataContext = createContext({
    categories: [],
    types: [],

    transactions: [],
    setTransactions: () => {},

    forecasts: [],
    setForecasts: () => {}
})

export default DataContext