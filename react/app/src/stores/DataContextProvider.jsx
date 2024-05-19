import apiService from "../services/ApiService";
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
    const [forecasts, setForecasts] = useState([]);
    const sc = useContext(StatusContext);

    useEffect(() => {
        const loadData = async () => {
            sc.incrementLoadingData();

            const loadedTransactions = await getTransactions();
            const loadedTypes = await getTypes();
            const loadedCategories = await getCategories();

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

        forecasts: forecasts,
        setForecasts: setForecasts
    }

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

async function getTransactions() {
    const transactionDTOs = await apiService.getData(endpointType.TRANSACTIONS);
    
    const transactions = [];
    for (const transactionDTO of transactionDTOs) {
        const transaction = mapper.mapToTransaction(transactionDTO);
        transactions.push(transaction);
    }

    return transactions;
}

async function getTypes() {
    const typeDTOs = await apiService.getData(endpointType.TYPES);

    const types = [];
    for (const typeDTO of typeDTOs) {
        const type = mapper.mapToType(typeDTO);
        types.push(type);
    }

    return types;
}

async function getCategories() {
    const categoryDTOs = await apiService.getData(endpointType.CATEGORIES);

    const categories = [];
    for (const categoryDTO of categoryDTOs) {
        const category = mapper.mapToCategory(categoryDTO);
        categories.push(category);
    }

    return categories;
}

export default DataContextProvider