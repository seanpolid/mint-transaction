/* eslint-disable react/prop-types */
import { findParent } from "../../utils/functions";
import Icon from "../Icon";
import { iconType, tabType } from "../../enums";
import style from "./style.module.css";
import { useEffect, useState } from "react";

const VerticalNavBar = ({currentTab, handleTabSelection}) => {
    const tabs = Object.values(tabType);
    const [icons, setIcons] = useState([]);
    const [net, setNet] = useState(14000);

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
        <>
            <nav className={style.container} aria-label="Primary Navigation">
                <ul>
                    {icons.filter(icon => icon.props["data-type"] !== tabType.PROFILE)}
                    {icons.filter(icon => icon.props["data-type"] === tabType.PROFILE)}
                </ul> 
            </nav>
            <p className={getNetStyling(net)}>{net > 0 ? "+" : ""}{net}</p>
        </>
        
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

const getNetStyling = (net) => {
    let netStyling = "";
    if (net > 0) {
        netStyling = `${style.net} ${style.positive}`;
    } else if (net < 0) {
        netStyling = `${style.net} ${style.negative}`;
    } else {
        netStyling = `${style.net} ${style.zero}`;
    }
    return netStyling;
}

export default VerticalNavBar;