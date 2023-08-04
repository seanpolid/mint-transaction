/* eslint-disable react/prop-types */
import Icon from "../Icon/Icon";
import style from "./style.module.css";
import { tabType } from "../../enums/tabType";

const VerticalNavBar = ({handleTabSelection}) => {
    const tabs = Object.values(tabType);
    
    const handleClick = (event) => {
        event.preventDefault();
        const target = event.target;
        handleTabSelection(target.text);
    }

    return (
        <nav className={style.container}>
            <ul>
                {tabs.slice(0, -1).map(tab => (
                    <li key={tab}>
                        <a href="#" onClick={handleClick} data-type={tab}>
                            <Icon type={tab} />
                        </a>
                    </li>
                ))}
            </ul>
            <a href="#" onClick={handleClick} data-type={tabs[tabs.length - 1]}>
                <Icon type={tabs[tabs.length - 1]} />
            </a>
        </nav>
    )
}

export default VerticalNavBar;