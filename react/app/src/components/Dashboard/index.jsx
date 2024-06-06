import DataContext from "../../stores/DataContext";
import InputWithLabel from "../InputWithLabel";
import { ExpenseGraph } from "./ExpenseGraph";
import { NetGraph } from "./NetGraph";
import { IncomeGraph } from "./IncomeGraph";
import SelectWithLabel from "../SelectWithLabel";
import style from './style.module.css'
import { useContext, useMemo, useState } from "react"
import { processNetData } from "./helpers";

const Net = {
    id: '1',
    name: 'Net'
}

const Expense = {
    id: '2',
    name: 'Expense'
}

const Income = {
    id: '3',
    name: 'Income'
}

const type = {
    NET:  Net,
    EXPENSE: Expense,
    INCOME: Income
}

const types = [Net, Expense, Income];

const defaultStartDate = new Date();
defaultStartDate.setDate(new Date().getDate() - 7);

const Dashboard = () => {
    const dc = useContext(DataContext);
    const [currentGraph, setCurrentGraph] = useState(Net.id);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(new Date());
    
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
                currentGraph={currentGraph}
                startDate={startDate}
                endDate={endDate}
                onChange={handleOptionsChange}
            />
        </div>
    )
}

const Graph = ({currentGraph, data, startDate, endDate}) => {
    const graph = {
        [Net.id]: (
            <NetGraph 
                data={processNetData(data, startDate, endDate)} 
            />
        ),
        [Income.id]: (
            <IncomeGraph 
                data={data.filter(transaction => transaction.category.type.name === 'Income')} 
            />
        ),
        [Expense.id]: (
            <ExpenseGraph 
                data={data.filter(transaction => transaction.category.type.name === 'Expense')}
            />
        )
    }

    return graph[currentGraph];
}

const Options = ({currentGraph, startDate, endDate, onChange}) => {
    return (
        <section className={style.options}>
            <div className={style.content}>
                <h1>Options</h1>
                <div>
                    <SelectWithLabel 
                        id='type'
                        name='type'
                        text='Type:'
                        items={types}
                        value={currentGraph}
                        onChange={onChange}
                    />
                </div>
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
        </section>
    )
}

function getDateString(date) {
    const string = date.toISOString();
    return string.split('T')[0];
}

export default Dashboard