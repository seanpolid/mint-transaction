import AddPage from "../AddPage";
import mapper from "../../utils/mapper";
import pageType from "../../enums/pageType";
import tabType from "../../enums/tabType";
import ViewPage from "../ViewPage";
import { getData } from "../../utils/functions";

const pageReducer = (state, action) => {
    const actionType = action.type;
    const newState = {
        ...state,
        [action.tab]: actionType
    }
    return newState;
}

const isLogType = (type) => {
    if ([tabType.TRANSACTIONS, tabType.GOALS].includes(type)) {
        return true;
    }
    return false;
}

const isWideEnough = () => {
    return true;
}

const getPage = (currentTab, currentPages) => {
    const currentPage = currentPages[currentTab];
    switch (currentPage) {
        case pageType.ADD:
            return <AddPage type={currentTab}/>
        case pageType.VIEW:
            return <ViewPage type={currentTab}/>
        default:
            return null;
    }
}

const getAllData = async (setTypes, setCategories, setGoals, setTransactions) => {
    try {
        const types = await getTypes();
        setTypes(types);
        
        const categories = await getCategories();
        setCategories(categories);

        const transactions = await getTransactions();
        setTransactions(transactions);

        return true;
    } catch (exception) {
        console.log(exception);
        return false;
    }
};

const getTypes = async () => {
    const uri = "http://localhost:8080/api/types";
    const typeDTOs = await getData(uri);

    const types = [];
    for (const typeDTO of typeDTOs) {
        const type = mapper.mapToType(typeDTO);
        types.push(type);
    }

    return types;
}

const getCategories = async () => {
    const uri = "http://localhost:8080/api/categories";
    const categoryDTOs = await getData(uri);

    const categories = [];
    for (const categoryDTO of categoryDTOs) {
        const category = mapper.mapToCategory(categoryDTO);
        categories.push(category);
    }

    return categories;
}

const getTransactions = async () => {
    const uri = "http://localhost:8080/api/transactions";
    const transactionDTOs = await getData(uri);
    
    const transactions = [];
    for (const transactionDTO of transactionDTOs) {
        const transaction = mapper.mapToTransaction(transactionDTO);
        transactions.push(transaction);
    }

    return transactions;
}

const addTransactions = (newTransactions, setTransactions) => {
    setTransactions(prevTransactions => prevTransactions.concat(newTransactions));
}

const removeTransaction = (id, setTransactions) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
}

const updateTransaction = (transaction, setTransaction) => {
    setTransaction(prevTransactions => {
        let index = 0;
        for (let i = 0; i < prevTransactions.length; i++) {
            const prevTransaction = prevTransactions[i];
            if (prevTransaction.id === transaction.id) {
                index = i;
                break;
            }
        }

        return prevTransactions.toSpliced(index, 1, transaction);
    })
}

export default { 
    pageReducer: pageReducer, 
    isLogType: isLogType, 
    isWideEnough: isWideEnough, 
    getPage: getPage, 
    getAllData: getAllData, 
    addTransactions: addTransactions, 
    removeTransaction: removeTransaction,
    updateTransaction: updateTransaction
}