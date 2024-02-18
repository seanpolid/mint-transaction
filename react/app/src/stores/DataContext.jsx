import { createContext } from "react";
import React from "react";

const DataContext = createContext({
    categories: [],
    types: [],

    transactions: [],
    setTransactions: () => {},

    goals: [],
    setGoals: () => {}
})

export default DataContext