/* eslint-disable react/prop-types */
import Dashboard from '../Dashboard'
import Log from '../Log'
import Profile from '../Profile'
import style from './style.module.css'
import tabType from '../../enums/tabType' 
import VerticalNavBar from '../VerticalNavBar'
import ViewPane from '../ViewPane'
import { useState } from 'react'

const App = () => {
    const tabTypes = Object.values(tabType);
    const [currentTab, setCurrentTab] = useState(tabTypes[0]);
    const tabsWithNav = [tabType.TRANSACTIONS, tabType.GOALS];

    const handleTabSelection = (selectedTab) => {
        setCurrentTab(selectedTab);
    }
    
    return (
        <main>
            <VerticalNavBar 
                currentTab={currentTab}
                handleTabSelection={handleTabSelection}
            />

            <div>
                <Tab currentTab={currentTab} />
                
                {tabsWithNav.includes(currentTab) ? (
                    <nav className={style.secondaryNav}>
                        <ul>
                            <li>View</li>
                            <li>Add</li>
                        </ul>
                    </nav>
                ) : (
                    null
                )}

                {isLogType(currentTab) && isWideEnough() ? <ViewPane /> : null}
            </div>
        </main> 
    )
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
