/* eslint-disable react/prop-types */
import { asTitleCase, findParent } from '../../utils/functions';
import DataContext from "../DataContext";
import Icon from "../Icon";
import { iconType, tabType, orderType } from "../../enums";
import RadioButtonWithLabel from '../RadioButtonWithLabel'
import Scrollpane from "../Scrollpane";
import { compareDate, compareString, compareAmount } from "./functions";
import style from './style.module.css';
import { useContext, useEffect, useState } from "react";

const Log = ({type, handleSelection}) => {
    const dataContext = useContext(DataContext);
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortTerm, setSortTerm] = useState(transactionSortType.DATE);
    const [sortOrder, setSortOrder] = useState(orderType.DESCENDING)
    const [sortWindowVisible, setSortWindowVisible] = useState(false);

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
        const sortItems = filteredItems.sort((t1, t2) => compareTransactions(sortTerm, sortOrder, t1, t2));
        if (sortItems.length > 0) {
            handleSelection(sortItems[0].identifier, false);
        }
        
        setLogs(sortItems.map(item => convertToLog[type](item)));
    }, [type, searchTerm, sortTerm, sortOrder, dataContext.transactions]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSortChange = (sortTerm, sortOrder) => {
        setSortTerm(sortTerm);
        setSortOrder(sortOrder);
    }

    const handleClick = (event) => {
        event.preventDefault();

        if (event.target.name === 'overlay') {
            setSortWindowVisible(false);
        } else {
            setSortWindowVisible(prev => !prev);
        }
    }

    return (
        <section className={style.container}>
            <form>
                <SearchBar onChange={handleSearchChange} />
                <a href="#" onClick={handleClick}>
                    <Icon type={iconType.SORT} />
                </a>
                {sortWindowVisible ? (
                    <>
                        <SortWindow 
                            initialSortTerm={sortTerm}
                            initialSortOrder={sortOrder}
                            type={type} 
                            onChange={handleSortChange} 
                        /> 
                        <div id='overlay' className={style.overlay} onClick={handleClick}></div>
                    </>
                ) : null}
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
    CATEGORY: "category",
    DATE: "date",
    AMOUNT: "amount"
}

const compareTransactions = (sortTerm, sortOrder, t1, t2) => {
    const multiplier = sortOrder === orderType.ASCENDING ? 1 : -1;
    const compare = {
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
        const target = findParent(event.target, {nodeName: "tr"});
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

const SortWindow = ({initialSortTerm, initialSortOrder, type, onChange}) => {
    const [sortTerm, setSortTerm] = useState(initialSortTerm);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const radioButtons = [
        {name: "order", text: asTitleCase(orderType.ASCENDING), checked: false, value: orderType.ASCENDING},
        {name: "order", text: asTitleCase(orderType.DESCENDING), checked: true, value: orderType.DESCENDING}
    ]

    // The option names should correspond to the attributes of the object 
    // that will be sorted
    const sortOptions = {
        [tabType.TRANSACTIONS]: Object.values(transactionSortType).sort((t1, t2) => compareString(t1, t2)),
        [tabType.GOALS]: []
    }

    useEffect(() => {
        onChange(sortTerm, sortOrder);
    }, [sortTerm, sortOrder]);

    const handleChange = (event) => {
        const target = event.target;
        if (target.nodeName === 'INPUT') {
            setSortOrder(target.value);
        } else {
            const row = findParent(target, {nodeName: 'tr'});
            setSortTerm(row.getAttribute("data-value"));
        }
    }

    return (
        <div className={style.sortWindow}>
            <div>
                {radioButtons.map(button => (
                    <RadioButtonWithLabel 
                        key={button.text}
                        name={button.name}
                        text={button.text}
                        value={button.value}
                        checked={button.value === sortOrder}
                        onChange={handleChange}
                        wrapped
                    />
                ))}
            </div>
            <table>
                <tbody>
                    {sortOptions[type].map(option => (
                        <tr key={option} onClick={handleChange} data-value={option}>
                            <td className={option === sortTerm ? style.active : null}>{asTitleCase(option)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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