import DataContext from "../../stores/DataContext";
import InputWithLabel from "../InputWithLabel";
import { Graph } from "./Graph";
import RadioButtonWithLabel from "../RadioButtonWithLabel";
import style from './style.module.css'
import { useContext, useEffect, useMemo, useState } from "react"
import { processNetData } from "./helpers";
import { ToggleButtonWithLabel } from "../ToggleButtonWithLabel";

const DEFAULT_END_DATE = new Date();

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setDate(DEFAULT_END_DATE.getDate() - 7);

const DISPLAY_TYPE_OPTIONS = ['Line', 'Bar', 'None'];

const DEFAULT_OPTIONS = {
    startDate: DEFAULT_START_DATE,
    endDate: DEFAULT_END_DATE,
    displayNet: false,
    incomeDisplayType: DISPLAY_TYPE_OPTIONS[0],
    expenseDisplayType: DISPLAY_TYPE_OPTIONS[0]
}

const Dashboard = () => {
    const dc = useContext(DataContext);
    const [options, setOptions] = useState(DEFAULT_OPTIONS);
    
    const startDateString = getDateString(options.startDate);
    const endDateString = getDateString(options.endDate);

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
    }, [dc.transactions, options.startDate, options.endDate]);
    
    const handleOptionsChange = (event) => {
        let {name, value} = event.target;

        if (name === 'startDate' || name === 'endDate') {
            value = new Date(value);
        }
        
        setOptions(prevOptions => ({
            ...prevOptions,
            [name]: value
        }))
    }

    return (
        <div className={style.container}>
            <section>
                <Graph 
                    data={processNetData(filteredTransactions, startDateString, endDateString, options)} 
                />  
            </section>

            <Options 
                options={options}
                onChange={handleOptionsChange}
            />
        </div>
    )
}

const Options = ({options, onChange}) => {
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
                        max={getDateString(options.endDate)}
                        value={getDateString(options.startDate)}
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
                        value={getDateString(options.endDate)}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className={style.display}>
                <h1>Display</h1>
                <div className={style.net}>
                    <ToggleButtonWithLabel 
                        id='displayNet'
                        name='displayNet'
                        text='Net:'
                        onChange={onChange}
                        value={options.displayNet}
                    />
                </div>
                <fieldset>
                    <legend>Income:</legend>
                    <div>
                        {DISPLAY_TYPE_OPTIONS.map(displayType => (
                            <RadioButtonWithLabel 
                                key={`${displayType} income`}
                                name='incomeDisplayType'
                                value={displayType}
                                text={displayType}
                                checked={displayType === options.incomeDisplayType}
                                onChange={onChange}
                                wrapped
                            />
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Expense:</legend>
                    <div>
                        {DISPLAY_TYPE_OPTIONS.map(displayType => (
                            <RadioButtonWithLabel 
                                key={`${displayType} expense`}
                                name='expenseDisplayType'
                                value={displayType}
                                text={displayType}
                                checked={displayType === options.expenseDisplayType}
                                onChange={onChange}
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