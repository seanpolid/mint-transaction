/* eslint-disable react/prop-types */
import Icon from "../Icon";
import iconType from "../../enums/iconType";
import style from "./style.module.css";
import tabType from "../../enums/tabType";

const tabIconMapping = {
    [tabType.TRANSACTIONS]: iconType.LOG,
    [tabType.DASHBOARD]: iconType.GRAPH,
    [tabType.GOALS]: iconType.TARGET,
    [tabType.PROFILE]: iconType.USER
}

const VerticalNavBar = ({handleTabSelection}) => {
    const tabs = Object.values(tabType).filter(type => type !== tabType.PROFILE);
    
    const handleClick = (event) => {
        event.preventDefault();
        const target = event.target;
        handleTabSelection(target.text);
    }

    return (
        <nav className={style.container}>
            <ul>
                {tabs.map(tab => (
                    <li key={tab}>
                        <a href="#" onClick={handleClick} data-type={tab}>
                            <Icon type={tabIconMapping[tab]} />
                        </a>
                    </li>
                ))}
            </ul> 
            <a href="#" onClick={handleClick} data-type={tabType.PROFILE}>
                <Icon type={tabIconMapping[tabType.PROFILE]} />
            </a>
        </nav>
    )
}

export default VerticalNavBar;