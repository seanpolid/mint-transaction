/* eslint-disable react/prop-types */
import Scrollpane from '../Scrollpane';
import style from './style.module.css'
import tabType from "../../enums/tabType"

const AddPage = ({type}) => {
    console.log("Add page: ", type);
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
                    <li>
                        <TransactionForm n={2}/>
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
                        <input type="radio" name={`type${n}`} value="income" id="income"/>
                        <label htmlFor="income">Income</label>

                        <input type="radio" name={`type${n}`} value="expense" id="expense" checked/>
                        <label htmlFor="expense">Expense</label>
                    </div>

                    <label htmlFor={`category${n}`}>Category:</label>
                    <select id={`category${n}`}>
                        <option>Gas</option>
                        <option>Groceries</option>
                        <options>Rent</options>
                    </select>

                    <label htmlFor={`recurs${n}`}>Recurs:</label>
                    <div>
                        <input type="radio" name={`recurs${n}`} value="yes" id="yes"/>
                        <label htmlFor="yes">Yes</label>

                        <input type="radio" name={`recurs${n}`} value="no" id="no" checked/>
                        <label htmlFor="no">No</label>
                    </div>

                    <label htmlFor={`date${n}`}>Date:</label>
                    <input type='date' />

                    <label htmlFor={`amount${n}`}>Amount:</label>
                    <input type='number'/>
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