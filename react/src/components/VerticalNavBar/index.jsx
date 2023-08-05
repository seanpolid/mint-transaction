/* eslint-disable react/prop-types */
import { findParent } from "../../utils/functions";
import Icon from "../Icon";
import iconType from "../../enums/iconType";
import style from "./style.module.css";
import tabType from "../../enums/tabType";
import { useEffect, useState } from "react";

const VerticalNavBar = ({currentTab, handleTabSelection}) => {
    const tabs = Object.values(tabType);
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        setIcons(tabs.map(tab => (
            <li key={tab} data-type={tab}> 
                <a href="#" onClick={handleClick}>
                    <Icon 
                        type={tabIconMapping[tab]} 
                        active={tab === currentTab}/>
                </a>
            </li>
        )), []);
    }, [currentTab]);

    const handleClick = (event) => {
        event.preventDefault();
        let target = event.target; 
        target = findParent(target,  {className: "icon"})
        const icon = target.getAttribute("data-type");

        if (target === null || icon === null) { return; }
        
        handleTabSelection(iconTabMapping[icon]);
    }

    return (
        <nav className={style.container}>
            <ul>
                {icons.filter(icon => icon.props["data-type"] !== tabType.PROFILE)}
            </ul> 

            {icons.filter(icon => icon.props["data-type"] === tabType.PROFILE)}
        </nav>
    )
}

const tabIconMapping = {
    [tabType.TRANSACTIONS]: iconType.LOG,
    [tabType.DASHBOARD]: iconType.GRAPH,
    [tabType.GOALS]: iconType.TARGET,
    [tabType.PROFILE]: iconType.USER
}

const iconTabMapping = {
    [iconType.LOG]: tabType.TRANSACTIONS,
    [iconType.GRAPH]: tabType.DASHBOARD,
    [iconType.TARGET]: tabType.GOALS,
    [iconType.USER]: tabType.PROFILE
}

export default VerticalNavBar;