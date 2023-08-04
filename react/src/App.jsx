/* eslint-disable react/prop-types */
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Log from './components/Log/Log'
import Profile from './components/Profile/Profile'
import { tabType } from './enums/tabType'
import VerticalNavBar from './components/VerticalNavBar/VerticalNavBar'
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
            <Tab currentTab={currentTab} />
        </main> 
    )
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
