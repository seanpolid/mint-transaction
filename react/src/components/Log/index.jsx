/* eslint-disable react/prop-types */
import { asTitleCase, findParent } from '../../utils/functions';
import Icon from "../Icon";
import { iconType, tabType, orderType, sortType } from "../../enums";
import RadioButtonWithLabel from '../RadioButtonWithLabel'
import Scrollpane from "../Scrollpane";
import { compareDate, compareString, compareAmount } from "./functions";
import style from './style.module.css';
import { useContext, useEffect, useState } from "react";
import TransactionContext from '../../stores/TransactionContext';
import GoalContext from '../../stores/GoalContext';

const Log = ({type}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortTerm, setSortTerm] = useState(sortType.DATE);
    const [sortOrder, setSortOrder] = useState(orderType.DESCENDING)
    const [sortWindowVisible, setSortWindowVisible] = useState(false);
    const [preparedItems, setPreparedItems] = useState([]);
    const tc = useContext(TransactionContext);
    const gc = useContext(GoalContext);

    const items = {
        [tabType.TRANSACTIONS]: tc.transactions,
        [tabType.GOALS]: gc.goals
    };

    useEffect(() => {
        const filteredItems = items[type].filter(item => searchTerm.length == 0 || item.toString().toLowerCase().includes(searchTerm));
        const sortedItems = filteredItems.sort((t1, t2) => compareTransactions(sortTerm, sortOrder, t1, t2));

        if (sortedItems.length > 0) {
            if (type === tabType.TRANSACTIONS) {
                tc.setSelectedTransaction(sortedItems[0]);
            } else {
                gc.setSelectedGoal(sortedItems[0]);
            }
        }

        setPreparedItems(sortedItems);
    }, [type, searchTerm, sortTerm, sortOrder, tc.transactions, gc.goals]);

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
                        {preparedItems.map(item => convertToLog(type, item))}
                    </tbody>
                </table>
            </Scrollpane>
        </section>
    )
}

function compareTransactions(sortTerm, sortOrder, t1, t2) {
    const multiplier = sortOrder === orderType.ASCENDING ? 1 : -1;
    const compare = {
        [sortType.CATEGORY]: () => {
            return compareString(t1.category.name, t2.category.name) * multiplier;
        },
        [sortType.DATE]: () => {
            const t1Date = t1.endDate ?? t1.startDate;
            const t2Date = t2.endDate ?? t2.startDate;
            return compareDate(t1Date, t2Date) * multiplier;
        }, 
        [sortType.AMOUNT]: () => {
            return compareAmount(t1.amount, t2.amount) * multiplier;
        }
    }

    return compare[sortTerm](t1, t2);
}

function convertToLog(type, item) {
    const logs = {
        [tabType.TRANSACTIONS]: <Transaction key={item.identifier} transaction={item} />,
        [tabType.GOALS]: <Goal key={item.id} goal={item} />
    }
    
    return logs[type]
}

const Transaction = ({transaction}) => {
    const [className, setClassName] = useState(`${style.transaction}`);
    const tc = useContext(TransactionContext);

    useEffect(() => {
        if (transaction === tc.selectedTransaction) {
            setClassName(`${style.transaction} ${style.active}`);
        } else {
            setClassName(`${style.transaction}`);
        }
    }, [tc.selectedTransaction]);

    const handleMouseEnter = () => {
        setClassName(`${style.transaction} ${style.active}`);
    }

    const handleMouseLeave = () => {
        if (transaction !== tc.selectedTransaction) {
            setClassName(`${style.transaction}`);
        }
    }

    const handleClick = (event) => {
        const target = findParent(event.target, {nodeName: "tr"});
        const identifier = target.getAttribute("data-identifier");
        tc.setSelectedTransaction(transaction);
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
        [tabType.TRANSACTIONS]: Object.values(sortType).sort((t1, t2) => compareString(t1, t2)),
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