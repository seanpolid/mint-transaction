/* eslint-disable react/prop-types */
import { asTitleCase } from '../../utils/functions'
import Dashboard from '../Dashboard'
import DataContext from '../DataContext'
import Log from '../Log'
import { pageReducer, isLogType, isWideEnough, getPage, getAllData } from './functions'
import Profile from '../Profile'
import style from './style.module.css'
import { tabType, pageType } from '../../enums' 
import VerticalNavBar from '../VerticalNavBar'
import { useEffect, useState, useReducer } from 'react'

const App = () => {
    const tabsWithPages = [tabType.TRANSACTIONS, tabType.GOALS];
    const tabTypes = Object.values(tabType);
    const [pages, setPages] = useState([]);
    const [currentTab, setCurrentTab] = useState(tabTypes[0]);
    const [currentPages, pageDispatch] = useReducer(pageReducer, defaultCurrentPages);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const data = {
        transactions: transactions,
        categories: categories,
        goals: goals,
        types: types,
        addTransactions: (newTransactions) => setTransactions(prevTransactions => prevTransactions.concat(newTransactions))
    }

    useEffect(() => {
        const loadData = async () => {
            const successful = await getAllData(setTypes, setCategories, setGoals, setTransactions);
 
            if (!successful) {
                setIsNetworkError(true);
                setIsLoading(false);
            } else {
                setTimeout(() => setIsLoading(false), 4000);
            }
        }
        loadData();
    }, []);
    

    useEffect(() => {
        if (tabsWithPages.includes(currentTab)) {
            setPages(Object.values(pageType).map(type => {
                const pageStyling = type === currentPages[currentTab] ? style.active : '';
                return (
                    <li key={type}>
                        <a 
                            href="#" 
                            className={pageStyling} 
                            onClick={handlePageSwitch}
                            data-type={type}>
                                {asTitleCase(type)}
                        </a>
                    </li>
                )
            }))
        }
    }, [currentPages, currentTab]);

    const handleTabSelection = (selectedTab) => {
        setCurrentTab(selectedTab);
    }

    const handlePageSwitch = (event) => {
        const target = event.target;
        const dataType = target.getAttribute("data-type")
        if (dataType === null) {return;}

        pageDispatch( {tab: currentTab, type: dataType} );
    }
    
    const handleLogSelection = (selectedLog) => {

    }

    return (
        <>
            <VerticalNavBar 
                currentTab={currentTab}
                handleTabSelection={handleTabSelection}
            />

            {isLoading && <LoadAnimation />}

            {!isLoading && isNetworkError && <NetworkError />}

            {!isLoading && !isNetworkError && (
                <DataContext.Provider value={data}>
                    <Tab currentTab={currentTab} />
                    
                    {tabsWithPages.includes(currentTab) ? (
                        <section>
                            <nav className={style.secondaryNav} aria-label='Secondary Navigation'>
                                <ul>
                                    {pages}
                                </ul>
                            </nav>
                            {isLogType(currentTab) && isWideEnough() ? getPage(currentTab, currentPages) : null}
                        </section>
                    ) : (
                        null
                    )}
                </DataContext.Provider>
            )}
        </>
    )
}

const defaultCurrentPages = {
    [tabType.TRANSACTIONS]: pageType.ADD,
    [tabType.GOALS]: pageType.ADD
}

const Tab = ({currentTab}) => {
    switch (currentTab) {
        case tabType.TRANSACTIONS:
        case tabType.GOALS:
            return <Log type={currentTab} />
        case tabType.DASHBOARD:
            return <Dashboard />
        case tabType.PROFILE:
            return <Profile />
    }
}

const LoadAnimation = () => {
    const [periods, setPeriods] = useState("");

    useEffect(() => {
        let numIntervals = 0;
        setInterval(() => {
            numIntervals++;
            setPeriods(() => {
                if (numIntervals == 1) {
                    return ".";
                } else if (numIntervals == 2) {
                    return "..";
                } else {
                    numIntervals = 0;
                    return "...";
                }
            });
        }, 1000);
    }, []);

    return (
        <div className={style.loadAnimation}>
            <div>
                <p>Retrieving Data{periods}</p>
                <div className={style.loadBar}></div>
            </div>            
        </div>
    )
}

const NetworkError = () => {
    return (
        <div className={style.networkError}>
            <h1>Could not communicate with server. Please try again later.</h1>
        </div>
    )
}

export default App
