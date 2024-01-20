/* eslint-disable react/prop-types */
import AddPage from '../AddPage'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import Dashboard from '../Dashboard'
import DataContext from '../DataContext'
import GoalContext from '../../stores/GoalContext'
import Log from '../Log'
import links from '../../config/links'
import Profile from '../Profile'
import style from './style.module.css'
import StatusContext from '../../stores/StatusContext'
import TransactionContext from '../../stores/TransactionContext'
import { tabType } from '../../enums' 
import VerticalNavBar from '../VerticalNavBar'
import ViewPage from '../ViewPage'
import { useEffect, useState, useContext } from 'react'
import { v4 } from 'uuid'

const App = () => {
    const tabTypes = Object.values(tabType);
    const sc = useContext(StatusContext);
    const tc = useContext(TransactionContext);
    const gc = useContext(GoalContext);

    const data = {
        selectedTransaction: tc.selectedTransaction,
        transactions: tc.transactions,
        categories: tc.categories,
        goals: gc.goals,
        types: tc.types,
        addTransactions: (newTransactions) => functions.addTransactions(newTransactions, setTransactions),
        removeTransaction: (id) => functions.removeTransaction(id, setTransactions),
        updateTransaction: (transaction) => functions.updateTransaction(transaction, setTransactions) 
    }

    return (
        <BrowserRouter>
            <VerticalNavBar />

            {sc.loadingData > 0 && <LoadAnimation />}

            {sc.loadingData == 0 && sc.isNetworkError && <NetworkError />}

            {sc.loadingData == 0 && !sc.isNetworkError && (
                <DataContext.Provider value={data}>
                    <Routes>
                        {tabTypes.map(type => (
                            <Route key={v4()} path={`${links[type]}`} element={<Tab type={type} />}>
                                <Route path='view' element={<ViewPage type={type} />} />
                                <Route path='add' element={<AddPage type={type} />} index/>
                            </Route>
                        ))}
                    </Routes>
                </DataContext.Provider>
            )}
        </BrowserRouter>
    )
}

const Tab = ({type}) => {
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
                                <NavLink to={'view'} className={({isActive}) => isActive ? style.active : ''}>
                                View
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'add'} className={({isActive}) => isActive ? style.active : ''}>
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
