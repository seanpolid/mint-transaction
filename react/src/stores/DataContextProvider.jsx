import ApiContext from "./ApiContext";
import DataContext from "./DataContext";
import endpointType from "../enums/endpointType";
import mapper from "../utils/mapper";
import React, { useContext } from "react";
import StatusContext from "./StatusContext";
import { useState, useEffect } from "react";

/**
 * Manages the saved data.
 * @param {*} param0 
 * @returns 
 */
const DataContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const sc = useContext(StatusContext);
    const api = useContext(ApiContext);

    useEffect(() => {
        const loadData = async () => {
            sc.incrementLoadingData();

            const loadedTransactions = await getTransactions(api);
            const loadedTypes = await getTypes(api);
            const loadedCategories = await getCategories(api);

            setTransactions(loadedTransactions);
            setTypes(loadedTypes);
            setCategories(loadedCategories);

            sc.decrementLoadingData();
        }

        loadData();
    }, []);

    const data = {
        categories: categories,
        types: types,

        transactions: transactions,
        setTransactions: setTransactions,

        goals: goals,
        setGoals: setGoals
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

async function getTransactions(api) {
    const transactionDTOs = await api.getData(endpointType.TRANSACTIONS);
    
    const transactions = [];
    for (const transactionDTO of transactionDTOs) {
        const transaction = mapper.mapToTransaction(transactionDTO);
        transactions.push(transaction);
    }

    return transactions;
}

async function getTypes(api) {
    const typeDTOs = await api.getData(endpointType.TYPES);

    const types = [];
    for (const typeDTO of typeDTOs) {
        const type = mapper.mapToType(typeDTO);
        types.push(type);
    }

    return types;
}

async function getCategories(api) {
    const categoryDTOs = await api.getData(endpointType.CATEGORIES);

    const categories = [];
    for (const categoryDTO of categoryDTOs) {
        const category = mapper.mapToCategory(categoryDTO);
        categories.push(category);
    }

    return categories;
}

export default DataContextProvider