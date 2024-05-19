/* eslint-disable react/prop-types */
import AddPage from '../AddPage'
import { Routes, Route, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Dashboard from '../Dashboard'
import ForecastContext from '../../stores/ForecastContext'
import Log from '../Log'
import links from '../../config/links'
import Profile from '../Profile'
import pageType from '../../enums/pageType'
import style from './style.module.css'
import StatusContext from '../../stores/StatusContext'
import { tabType } from '../../enums' 
import TransactionContext from '../../stores/TransactionContext'
import VerticalNavBar from '../VerticalNavBar'
import ViewPage from '../ViewPage'
import { useEffect, useState, useContext, useReducer, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 } from 'uuid'

const tabsWithPages = [tabType.TRANSACTIONS, tabType.FORECASTS];

const App = () => {
    const [pageState, dispatch] = useReducer(pageReducer, initialPageState);
    const sc = useContext(StatusContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/transactions/add");
        }
    }, []);

    const handleClick = (event) => {
        const target = event.target;
        const type = target.getAttribute('data-type');
        const page = target.getAttribute('data-page');
        
        dispatch({ type: type, page: page });
    }

    return (
        <>
            <VerticalNavBar pageState={pageState} />

            {sc.loadingData > 0 && <LoadAnimation />}

            {sc.loadingData == 0 && sc.isNetworkError && <NetworkError />}

            {sc.loadingData == 0 && !sc.isNetworkError && (
                <Routes>
                    <Route path={links[tabType.DASHBOARD]} element={<Dashboard />} />
                    <Route path={links[tabType.PROFILE]} element={<Profile />} />

                    {tabsWithPages.map(type => (
                        <Route key={v4()} path={`${links[type]}`} element={<TabWithPages type={type} onClick={handleClick}/>}>
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
            )}
        </>
    )
}

const initialPageState = {
    [tabType.TRANSACTIONS]: pageType.ADD,
    [tabType.FORECASTS]: pageType.ADD
}

function pageReducer(state, action) {
    return {
        ...state,
        [action.type]: action.page,
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

const TabWithPages = ({type, onClick}) => {    
    const tc = useContext(TransactionContext);
    const fc = useContext(ForecastContext);
    const [selectedId, setSelectedId] = useState(getSelectedId(type, tc, fc));
    const navigate = useNavigate();

    useEffect(() => {
        if (type === tabType.TRANSACTIONS) {
            setSelectedId(tc.selectedTransaction ? tc.selectedTransaction.id : null);
        } else if (type === tabType.FORECASTS) {
            setSelectedId(fc.selectedForecast ? fc.selectedForecast.id : null);
        }
    }, [tc.selectedTransaction, fc.selectedForecast]);

    // Necessary to handle selection at this level to prevent unnecessary rerendering of 
    // log when TransactionContext or ForecastContext get updated from AddPage
    const handleSelection = useCallback((selectedItem, switchToView) => {
        const setters = {
            [tabType.TRANSACTIONS]: tc.setSelectedTransaction,
            [tabType.FORECASTS]: fc.setSelectedForecast
        }
        const viewLinks = {
            [tabType.TRANSACTIONS]: `${links[tabType.TRANSACTIONS]}/view`,
            [tabType.FORECASTS]: `${links[tabType.FORECASTS]}/view`
        }

        setters[type](selectedItem);

        if (switchToView) {
            navigate(viewLinks[type]);
        }
    }, [type]);

    return (
        <>
            <Log 
                type={type} 
                handleSelection={handleSelection}
                selectedId={selectedId}
            />

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
        </>
    )
}

function getSelectedId(type, tc, fc) {
    const selectedItem = {
        [tabType.TRANSACTIONS]: tc.selectedTransaction,
        [tabType.FORECASTS]: fc.selectedForecast
    }

    if (!selectedItem[type]) {
        return null;
    }

    return selectedItem[type].id;
}

export default App
