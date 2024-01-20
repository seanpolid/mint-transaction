/* eslint-disable react/prop-types */
import { findParent } from "../../utils/functions";
import Icon from "../Icon";
import { iconType, tabType } from "../../enums";
import links from '../../config/links'
import { NavLink, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useEffect, useState } from "react";

const VerticalNavBar = () => {
    const [icons, setIcons] = useState([]);
    const [net, setNet] = useState(14000);
    const navigate = useNavigate();

    useEffect(() => {
        setIcons(Object.values(tabType).map(tab => (
            <li key={tab} data-type={tab}> 
                <NavLink to={links[tab]} onClick={handleClick} className={({isActive}) => isActive ? style.active : style.normal}>
                    <Icon 
                        type={tabIconMapping[tab]} 
                    />
                </NavLink>
            </li>
        )));
    }, []);

    const handleClick = (event) => {
        event.preventDefault();

        const target = findParent(event.target,  {nodeName: "li"})
        const type = target.getAttribute("data-type");
        if (target === null || type === null) { return; }
        
        switch (type) {
            case tabType.TRANSACTIONS:
            case tabType.GOALS:
                navigate(`${links[type]}/view`);
                break;
            case tabType.DASHBOARD:
                navigate(`${links[type]}`);
                break;
            case tabType.PROFILE:
                navigate(`${links[type]}`);
        }
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