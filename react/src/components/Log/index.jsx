/* eslint-disable react/prop-types */
import DataContext from "../DataContext";
import { findParent } from "../../utils/functions";
import Icon from "../Icon";
import { iconType, tabType } from "../../enums";
import Scrollpane from "../Scrollpane";
import style from './style.module.css';
import { useContext, useEffect, useState } from "react";

const Log = ({type, handleSelection}) => {
    const dataContext = useContext(DataContext);
    const items = {
        [tabType.TRANSACTIONS]: dataContext.transactions,
        [tabType.GOALS]: dataContext.goals
    };
    const convertToLog = {
        [tabType.TRANSACTIONS]: (item) => <Transaction key={item.identifier} transaction={item} handleSelection={handleSelection} />,
        [tabType.GOALS]: (item) => <Goal goal={item} handleSelection={handleSelection} />
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

const Transaction = ({transaction, handleSelection}) => {
    const dataContext = useContext(DataContext);
    const [className, setClassName] = useState(`${style.transaction}`);

    useEffect(() => {
        if (transaction === dataContext.selectedTransaction) {
            setClassName(`${style.transaction} ${style.active}`);
        } else {
            setClassName(`${style.transaction}`);
        }
    }, [dataContext.selectedTransaction]);

    const handleMouseEnter = () => {
        setClassName(`${style.transaction} ${style.active}`);
    }

    const handleMouseLeave = () => {
        if (transaction !== dataContext.selectedTransaction) {
            setClassName(`${style.transaction}`);
        }
    }

    const handleClick = (event) => {
        const target = findParent(event.target, {type: "tr"});
        const identifier = target.getAttribute("data-identifier");
        handleSelection(identifier);
    }

    return (
        <tr key={transaction.identifier} 
            data-identifier={transaction.identifier} 
            className={className} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={handleClick}>
            <td>
                <span className={style.type}>{transaction.category.type.name}</span>
                <span className={style.category}>{transaction.category.name}</span>
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