/* eslint-disable react/prop-types */
import DataContext from "../DataContext";
import Icon from "../Icon";
import { iconType, tabType } from "../../enums";
import Scrollpane from "../Scrollpane";
import style from './style.module.css';
import { useContext, useState } from "react";

const Log = ({type}) => {
    const dataContext = useContext(DataContext);
    const items = {
        [tabType.TRANSACTIONS]: dataContext.transactions,
        [tabType.GOALS]: dataContext.goals
    };
    const convertToLog = {
        [tabType.TRANSACTIONS]: (item) => <Transaction key={item.identifier} transaction={item} />,
        [tabType.GOALS]: (item) => <Goal goal={item} />
    }

    const logs = items[type].map(item => convertToLog[type](item));

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

const Transaction = ({transaction}) => {
    const [className, setClassName] = useState(`${style.transaction}`);

    const handleMouseEnter = () => {
        setClassName(`${style.transaction} ${style.active}`);
    }

    const handleMouseLeave = () => {
        setClassName(`${style.transaction}`);
    }

    return (
        <tr key={transaction.identifier} className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <td>
                <span className={style.type}>{transaction.typeName}</span>
                <span className={style.category}>{transaction.categoryName}</span>
                <span className={style.date}>
                    {transaction.endDate ? transaction.endDate : transaction.startDate}
                </span>
            </td>
            <td className={style.amount}>${transaction.amount}</td>
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

const Goal = () => {
    return (
        <>
        
        </>
    )
}

export default Log;