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
        logs.push(<Transaction key={i}/>);
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
                <table>
                    <tbody>
                        {logs}
                    </tbody>
                </table>
            </Scrollpane>
        </section>
    )
}

const Transaction = ({}) => {
    return (
        <tr className={style.transaction}>
            <td>
                <span className={style.type}>Income</span>
                <span className={style.category}>Job</span>
                <span className={style.date}>08/15/2023</span>
            </td>
            <td className={style.amount}>$1000</td>
        </tr>
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