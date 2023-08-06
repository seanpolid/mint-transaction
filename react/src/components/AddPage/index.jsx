/* eslint-disable react/prop-types */
import InputWithLabel from '../InputWithLabel';
import RadioButtonWithLabel from '../RadioButtonWithLabel';
import Scrollpane from '../Scrollpane';
import style from './style.module.css'
import tabType from "../../enums/tabType"

const AddPage = ({type}) => {
    const page = {
        [tabType.TRANSACTIONS]: <TransactionPage />,
        [tabType.GOALS]: <GoalPage />
    }

    return page[type];
}

const TransactionPage = () => {
    return (
        <section>
            <Scrollpane className={style.transactionContainer}>
                <ul>
                    <li>
                        <TransactionForm n={1}/>
                    </li>
                </ul>
                <button>Save</button>
            </Scrollpane>
        </section>
    )
}

const TransactionForm = ({n}) => {
    return (
        <>
            <p>Transaction {n}</p>
            <form className={style.transactionForm}>
                <div className={style.firstColumn}>
                    <label>Transaction Type:</label>
                    
                    <div>
                        <RadioButtonWithLabel 
                            value='income'
                            text='Income'
                        />
                        
                        <RadioButtonWithLabel
                            value='expense'
                            text='Expense'
                            checked
                        />
                    </div>

                    <label htmlFor={`category${n}`}>Category:</label>
                    <select id={`category${n}`}>
                        <option>Gas</option>
                        <option>Groceries</option>
                        <options>Rent</options>
                    </select>

                    <label htmlFor={`recurs${n}`}>Recurs:</label>
                    <div>
                        <RadioButtonWithLabel
                            value='yes'
                            text='Yes'
                        />

                        <RadioButtonWithLabel
                            value='no'
                            text='No'
                            checked
                        />
                    </div>

                    <InputWithLabel 
                        id={`date${n}`}
                        type='date'
                        text='Date:'
                    />

                    <InputWithLabel
                        id={`amount${n}`}
                        type='number'
                        text='Amount:'
                    />
                </div>
                
                <div className={style.secondColumn}>
                    <label htmlFor={`notes${n}`}>Notes:</label>
                    <textarea id={`notes${n}`} className={style.textarea}/>
                </div>

                <button className={style.add}>+</button>
                <button className={style.delete}>-</button>
            </form>
        </>
    )
}

const GoalPage = () => {
    return (
        <section>
            <h1>Add Goals</h1>
        </section>
    )
}

export default AddPage