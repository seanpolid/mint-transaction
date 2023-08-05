import AddPage from "../AddPage";
import pageType from "../../enums/pageType";
import tabType from "../../enums/tabType";
import ViewPage from "../ViewPage";

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

export { pageReducer, isLogType, isWideEnough, getPage }