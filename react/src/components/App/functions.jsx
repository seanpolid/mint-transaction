import AddPage from "../AddPage";
import pageType from "../../enums/pageType";
import tabType from "../../enums/tabType";
import ViewPage from "../ViewPage";
import { getData, asTitleCase } from "../../utils/functions";

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
            return <AddPage type={currentTab} />
        case pageType.VIEW:
            return <ViewPage type={currentTab} />
        default:
            return null;
    }
}

const getAllData = async (setTypes, setCategories, setGoals, setTransactions) => {
    try {
        const types = await getTypes();
        setTypes(types);
        
        const categories = await getCategories(types);
        setCategories(categories);

        const transactions = await getTransactions(types, categories);
        setTransactions(transactions);

        return true;
    } catch (exception) {
        return false;
    }
};

const getTypes = async () => {
    const uri = "http://localhost:8080/api/types";
    let types = await getData(uri);

    for (const type of types) {
        type.name = asTitleCase(type.name);
    }

    return types;
}

const getCategories = async (types) => {
    const uri = "http://localhost:8080/api/categories";
    let categories = await getData(uri);

    for (const category of categories) {
        category.name = asTitleCase(category.name);
        category.type = asTitleCase(category.type);
    }

    categories = categories.map(category =>  {
        const type = types.filter(type => type.name === category.type)[0];
        return {...category, type_id: type.id};
    });

    return categories;
}

const getTransactions = async (types, categories) => {
    const uri = "http://localhost:8080/api/transactions";
    let transactions = await getData(uri);
    console.log(transactions);
    return transactions;
}

export { pageReducer, isLogType, isWideEnough, getPage, getAllData }