/* eslint-disable react/prop-types */
import './App.css'
import Dashboard from './components/Dashboard'
import Log from './components/Log'
import Profile from './components/Profile'
import { tabType } from './enums/tabType'
import VerticalNavBar from './components/VerticalNavBar'
import ViewPane from './components/ViewPane'
import { useState } from 'react'

const App = () => {
    const tabTypes = Object.values(tabType);
    const [currentTab, setCurrentTab] = useState(tabTypes[0]);
    const handleTabSelection = (selectedTab) => {
        setCurrentTab(selectedTab);
    }
    
    return (
        <main>
            <VerticalNavBar 
                handleTabSelection={handleTabSelection}
            />
            <div>
                <Tab currentTab={currentTab} />
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
