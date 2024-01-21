/* eslint-disable react/prop-types */
import AddPage from '../AddPage'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import Dashboard from '../Dashboard'
import DataContext from '../DataContext'
import GoalContext from '../../stores/GoalContext'
import Log from '../Log'
import links from '../../config/links'
import Profile from '../Profile'
import pageType from '../../enums/pageType'
import style from './style.module.css'
import StatusContext from '../../stores/StatusContext'
import TransactionContext from '../../stores/TransactionContext'
import { tabType } from '../../enums' 
import VerticalNavBar from '../VerticalNavBar'
import ViewPage from '../ViewPage'
import { useEffect, useState, useContext, useReducer } from 'react'
import { v4 } from 'uuid'

const App = () => {
    const [pageState, dispatch] = useReducer(pageReducer, initialPageState);
    const sc = useContext(StatusContext);
    const tc = useContext(TransactionContext);
    const gc = useContext(GoalContext);

    const data = {
        selectedTransaction: tc.selectedTransaction,
        transactions: tc.transactions,
        categories: tc.categories,
        goals: gc.goals,
        types: tc.types,
        addTransactions: tc.saveNewTransactions,
        removeTransaction: (id) => tc.removeTransaction(id),
        updateTransaction: (transaction) => tc.updateTransaction(transaction) 
    }

    const handleClick = (event) => {
        const target = event.target;
        const type = target.getAttribute('data-type');
        const page = target.getAttribute('data-page');
        
        dispatch({ type: type, page: page });
    }

    return (
        <BrowserRouter>
            <VerticalNavBar pageState={pageState} />

            {sc.loadingData > 0 && <LoadAnimation />}

            {sc.loadingData == 0 && sc.isNetworkError && <NetworkError />}

            {sc.loadingData == 0 && !sc.isNetworkError && (
                <DataContext.Provider value={data}>
                    <Routes>
                        {Object.values(tabType).map(type => (
                            <Route key={v4()} path={`${links[type]}`} element={<Tab type={type} onClick={handleClick}/>}>
                                <Route 
                                    path={pageType.VIEW} 
                                    element={<ViewPage type={type} />} 
                                />
                                <Route 
                                    path={pageType.ADD} 
                                    element={<AddPage type={type} />} 
                                    index
                                />
                            </Route>
                        ))}
                    </Routes>
                </DataContext.Provider>
            )}
        </BrowserRouter>
    )
}

const initialPageState = {
    [tabType.TRANSACTIONS]: pageType.ADD,
    [tabType.GOALS]: pageType.ADD
}

function pageReducer(state, action) {
    return {
        ...state,
        [action.type]: action.page,
    }
}

const Tab = ({type, onClick}) => {
    const tabsWithPages = [tabType.TRANSACTIONS, tabType.GOALS];
    const tabs = {
        [tabType.TRANSACTIONS]: <Log type={tabType.TRANSACTIONS} handleSelection={() => {}} />,
        [tabType.GOALS]: <Log type={tabType.GOALS} handleSelection={() => {}} />,
        [tabType.DASHBOARD]: <Dashboard />,
        [tabType.PROFILE]: <Profile />
    }
    
    return (
        <>
            {tabs[type]}

            {tabsWithPages.includes(type) ? (
                <section>
                    <nav className={style.secondaryNav} aria-label='Secondary Navigation'>
                        <ul>
                            <li>
                                <NavLink 
                                    to={'view'} 
                                    className={({isActive}) => isActive ? style.active : ''} 
                                    onClick={onClick}
                                    data-type={type}
                                    data-page={pageType.VIEW}>
                                    View
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={'add'} 
                                    className={({isActive}) => isActive ? style.active : ''} 
                                    onClick={onClick}
                                    data-type={type}
                                    data-page={pageType.ADD}>
                                    Add
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <Outlet/>
                </section>
            ) : (
                null
            )}
        </>
    )
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
