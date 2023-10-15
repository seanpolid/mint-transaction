/* eslint-disable react/prop-types */
import DataContext from "../DataContext";
import { findParent } from "../../utils/functions";
import Icon from "../Icon";
import { iconType, tabType } from "../../enums";
import Scrollpane from "../Scrollpane";
import { compareDate, compareString, compareAmount } from "./functions";
import style from './style.module.css';
import { useContext, useEffect, useState } from "react";

const Log = ({type, handleSelection}) => {
    const dataContext = useContext(DataContext);
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortTerm, setSortTerm] = useState(transactionSortType.DATE);

    const items = {
        [tabType.TRANSACTIONS]: dataContext.transactions,
        [tabType.GOALS]: dataContext.goals
    };
    const convertToLog = {
        [tabType.TRANSACTIONS]: (item) => <Transaction key={item.identifier} transaction={item} handleSelection={handleSelection} />,
        [tabType.GOALS]: (item) => <Goal goal={item} handleSelection={handleSelection} />
    }

    useEffect(() => {
        const filteredItems = items[type].filter(item => searchTerm.length == 0 || item.toString().toLowerCase().includes(searchTerm));
        const sortItems = filteredItems.sort((t1, t2) => compareTransactions(sortTerm, t1, t2));
        if (sortItems.length > 0) {
            handleSelection(sortItems[0].identifier, false);
        }
        
        setLogs(sortItems.map(item => convertToLog[type](item)));
    }, [searchTerm, dataContext.transactions]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <section className={style.container}>
            <form>
                <SearchBar onChange={handleChange} />
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

const transactionSortType = {
    TYPE: "type",
    CATEGORY: "category",
    DATE: "date",
    AMOUNT: "amount"
}

const compareTransactions = (sortTerm, t1, t2, ascending=false) => {
    const multiplier = ascending ? 1 : -1;
    const compare = {
        [transactionSortType.TYPE]: () => {
            return compareString(t1.type.name, t2.type.name) * multiplier;
        },
        [transactionSortType.CATEGORY]: () => {
            return compareString(t1.category.name, t2.category.name) * multiplier;
        },
        [transactionSortType.DATE]: () => {
            const t1Date = t1.endDate ?? t1.startDate;
            const t2Date = t2.endDate ?? t2.startDate;
            return compareDate(t1Date, t2Date) * multiplier;
        }, 
        [transactionSortType.AMOUNT]: () => {
            return compareAmount(t1.amount, t2.amount) * multiplier;
        }
    }

    return compare[sortTerm](t1, t2);
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

const SearchBar = ({onChange}) => {
    return (
        <div className={style.searchBar}>
            <input type='text' placeholder='Search' onChange={onChange}/>
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