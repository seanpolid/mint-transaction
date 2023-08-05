/* eslint-disable react/prop-types */
import Icon from "../Icon";
import iconType from "../../enums/iconType";
import tabType from "../../enums/tabType"
import style from './style.module.css'

const Log = ({type}) => {
    switch (type) {
        case tabType.TRANSACTIONS:
            break;
        case tabType.GOALS:
            break;
    }

    let logs = [];
    for (let i = 0; i < 100; i++) {
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
            <Scrollpane>
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

const Scrollpane = ({children}) => {
    return (
        <div className={style.scrollpane}>
            {children}
        </div>
    )
}

export default Log;