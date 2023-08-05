/* eslint-disable react/prop-types */
import { asTitleCase } from '../../utils/functions'
import Dashboard from '../Dashboard'
import Log from '../Log'
import pageType from '../../enums/pageType'
import { pageReducer, isLogType, isWideEnough, getPage } from './functions'
import Profile from '../Profile'
import style from './style.module.css'
import tabType from '../../enums/tabType' 
import VerticalNavBar from '../VerticalNavBar'
import { useEffect, useState, useReducer } from 'react'

const App = () => {
    const tabTypes = Object.values(tabType);
    const [pages, setPages] = useState([]);
    const [currentTab, setCurrentTab] = useState(tabTypes[0]);
    const [currentPages, pageDispatch] = useReducer(pageReducer, defaultCurrentPages);
    const tabsWithPages = [tabType.TRANSACTIONS, tabType.GOALS];

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
    
    return (
        <main>
            <VerticalNavBar 
                currentTab={currentTab}
                handleTabSelection={handleTabSelection}
            />

            <div>
                <Tab currentTab={currentTab} />
                
                {tabsWithPages.includes(currentTab) ? (
                    <div>
                        <nav className={style.secondaryNav}>
                            <ul>
                                {pages}
                            </ul>
                        </nav>
                        {isLogType(currentTab) && isWideEnough() ? getPage(currentTab, currentPages) : null}
                    </div>
                ) : (
                    null
                )}
            </div>
        </main> 
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

export default App
