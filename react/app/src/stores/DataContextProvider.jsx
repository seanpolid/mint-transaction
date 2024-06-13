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
    const [averageDailyIncome, setAverageDailyIncome] = useState(0);
    const [forecasts, setForecasts] = useState([]);
    const sc = useContext(StatusContext);

    useEffect(() => {
        const loadData = async () => {
            sc.incrementLoadingData();

            const loadedTransactions = await getTransactions();
            const loadedTypes = await getTypes();
            const loadedCategories = (await getCategories()).sort((c1, c2) => c1.name.localeCompare(c2.name));

            setTransactions(loadedTransactions);
            setTypes(loadedTypes);
            setCategories(loadedCategories);
            setAverageDailyIncome(getAverageDailyIncome(loadedTransactions));

            sc.decrementLoadingData();
        }

        loadData();
    }, []);

    const addNewCategories = (newCategories) => {
        setCategories(prevCategories => prevCategories.concat(newCategories));
    }

    const data = {
        categories: categories,
        addNewCategories: addNewCategories,

        types: types,

        transactions: transactions,
        setTransactions: setTransactions,

        forecasts: forecasts,
        setForecasts: setForecasts,

        averageDailyIncome: averageDailyIncome
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

function getAverageDailyIncome(transactions) {
    const incomes = transactions.filter(transaction => transaction.category.type.name === 'Income');

    let numDays = 0;
    let total = 0;
    for (const income of incomes) {
        if (income.startDate && income.endDate) {
            numDays += getDifferenceInDays(income.startDate, income.endDate);
            total += income.amount;
        }
    }

    return total / numDays;
}

function getDifferenceInDays(dateString1, dateString2) {
    const differenceInTime = new Date(dateString2).getTime() - new Date(dateString1).getTime() + (24 * 3600 * 1000);
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
    return differenceInDays;
}

export default DataContextProvider