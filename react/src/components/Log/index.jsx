/* eslint-disable react/prop-types */
import Icon from "../Icon";
import { iconType, tabType } from "../../enums";
import Scrollpane from "../Scrollpane";
import style from './style.module.css';

const Log = ({type}) => {
    switch (type) {
        case tabType.TRANSACTIONS:
            break;
        case tabType.GOALS:
            break;
    }

    let logs = [];
    for (let i = 0; i < 5; i++) {
        logs.push(<li key={i}></li>);
    }

    return (
        <section className={style.container}>
            <form>
                <SearchBar />
                <a href="#">
                    <Icon type={iconType.FILTER} />
                </a>
                <a href="#">
                    <Icon type={iconType.SORT} />
                </a>
            </form>
            <Scrollpane className={style.log}>
                <ul>
                    {logs}
                </ul>
            </Scrollpane>
        </section>
    )
}

const SearchBar = () => {
    return (
        <div className={style.searchBar}>
            <input type='text' placeholder='Search'/>
            <Icon type={iconType.SEARCH} />
        </div>
        
    )
}

export default Log;