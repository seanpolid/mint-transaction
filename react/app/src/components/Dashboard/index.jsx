import DataContext from "../../stores/DataContext";
import InputWithLabel from "../InputWithLabel";
import { NetGraph } from "./NetGraph";
import RadioButtonWithLabel from "../RadioButtonWithLabel";
import style from './style.module.css'
import { useContext, useEffect, useMemo, useState } from "react"
import { processNetData } from "./helpers";
import { ToggleButtonWithLabel } from "../ToggleButtonWithLabel";

const DEFAULT_END_DATE = new Date();

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setDate(DEFAULT_END_DATE.getDate() - 7);

const Dashboard = () => {
    const dc = useContext(DataContext);
    const [currentGraph, setCurrentGraph] = useState('1');
    const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
    const [endDate, setEndDate] = useState(DEFAULT_END_DATE);
    
    const startDateString = getDateString(startDate);
    const endDateString = getDateString(endDate);

    const filteredTransactions = useMemo(() => {
        return dc.transactions.filter(transaction => {
            if (transaction.endDate) {
                if ((transaction.endDate >= startDateString && transaction.startDate <= startDateString) ||
                    (transaction.startDate <= endDateString && transaction.endDate >= endDateString) ||
                    (transaction.startDate >= startDateString && transaction.endDate <= endDateString)) {
                        return true;
                }
            } else {
                if (startDateString <= transaction.startDate && transaction.startDate <= endDateString) {
                    return true;
                }
            }

            return false;
        })
    }, [dc.transactions, startDate, endDate]);
    
    const handleOptionsChange = (event) => {
        const target = event.target;
        const attributeName = target.name;
        const value = target.value;

        switch (attributeName) {
            case 'type':
                setCurrentGraph(value);
                break;
            case 'startDate':
                setStartDate(new Date(value));
                break;
            case 'endDate':
                setEndDate(new Date(value));
                break;
            default:
                break;
        }
    }

    return (
        <div className={style.container}>
            <section>
                <Graph currentGraph={currentGraph} data={filteredTransactions} startDate={startDateString} endDate={endDateString}/>
            </section>

            <Options 
                startDate={startDate}
                endDate={endDate}
                onChange={handleOptionsChange}
            />
        </div>
    )
}

const Graph = ({data, startDate, endDate}) => {
    return (
        <NetGraph 
            data={processNetData(data, startDate, endDate)} 
        />
    );
}

const displayTypeOptions = ['Line', 'Bar'];

const Options = ({startDate, endDate, onChange}) => {
    const [displayNet, setDisplayNet] = useState(false);
    const [currentIncomeDisplayType, setCurrentIncomeDisplayType] = useState(displayTypeOptions[0]);
    const [currentExpenseDisplayType, setCurrentExpenseDisplayType] = useState(displayTypeOptions[0]);

    useEffect(() => {
        console.log(displayNet, currentIncomeDisplayType, currentExpenseDisplayType);
    }, [displayNet, currentIncomeDisplayType, currentExpenseDisplayType])

    const handleDisplayNetChange = (value) => {
        setDisplayNet(value);
    }

    const handleIncomeDisplayTypeChange = (value) => {
        setCurrentIncomeDisplayType(value);
    }

    const handleExpenseDisplayTypeChange = (value) => {
        setCurrentExpenseDisplayType(value);
    }

    return (
        <section className={style.options}>
            <div className={style.range}>
                <h1>Range</h1>
                <div>
                    <InputWithLabel 
                        id='startDate'
                        name='startDate'
                        text='Start Date:'
                        type='date'
                        max={getDateString(endDate)}
                        value={getDateString(startDate)}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <InputWithLabel 
                        id='endDate'
                        name='endDate'
                        text='End Date:'
                        type='date'
                        max={getDateString(new Date())}
                        value={getDateString(endDate)}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className={style.display}>
                <h1>Display</h1>
                <div className={style.net}>
                    <ToggleButtonWithLabel 
                        id='net'
                        name='net'
                        text='Net:'
                        onChange={handleDisplayNetChange}
                        value={displayNet}
                    />
                </div>
                <fieldset>
                    <legend>Income:</legend>
                    <div>
                        {displayTypeOptions.map(displayType => (
                            <RadioButtonWithLabel 
                                name='income'
                                text={displayType}
                                checked={displayType === currentIncomeDisplayType}
                                onChange={() => handleIncomeDisplayTypeChange(displayType)}
                                wrapped
                            />
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Expense:</legend>
                    <div>
                        {displayTypeOptions.map(displayType => (
                            <RadioButtonWithLabel 
                                name='expense'
                                text={displayType}
                                checked={displayType === currentExpenseDisplayType}
                                onChange={() => handleExpenseDisplayTypeChange(displayType)}
                                wrapped
                            />
                        ))}
                    </div>
                </fieldset>
            </div>
        </section>
    )
}

function getDateString(date) {
    const string = date.toISOString();
    return string.split('T')[0];
}

export default Dashboard