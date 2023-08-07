/* eslint-disable react/prop-types */
import InputWithLabel from '../InputWithLabel';
import RadioButtonWithLabel from '../RadioButtonWithLabel';
import Scrollpane from '../Scrollpane';
import style from './style.module.css'
import { tabType } from "../../enums"
import { useState, useEffect } from 'react';

const AddPage = ({type}) => {
    const page = {
        [tabType.TRANSACTIONS]: <TransactionPage />,
        [tabType.GOALS]: <GoalPage />
    }

    return page[type];
}

const TransactionPage = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        setForms([createTransactionForm(1, handleDelete)]);
    }, []);

    const handleDelete = (event) => {
        event.preventDefault();
        const formNum = event.target.getAttribute("data-form");
        setForms(prevForms => {
            console.log(prevForms.length);
            if (prevForms.length > 1) {
                return prevForms.filter(form => form.key !== formNum)
            }
            return prevForms;
        });
    };

    const handleAdd = (event) => {
        event.preventDefault();
        setForms(prevForms => prevForms.concat([createTransactionForm(forms.length + 1, handleDelete)]));
    }

    return (
        <section>
            <Scrollpane className={style.transactionContainer}>
                <ul>
                    {forms}
                </ul>

                <div className={style.options}>
                    <button onClick={handleAdd}>Add</button>
                    <button>Save</button>
                </div>
            </Scrollpane>
        </section>
    )
}

const createTransactionForm = (formNum, onButtonClick) => {
    return (
        <li key={formNum}>
            <TransactionForm formNum={formNum} onButtonClick={onButtonClick} />
        </li>
    )
} 

const TransactionForm = ({formNum, onButtonClick}) => {
    return (
        <>
            <p>Transaction {formNum}</p>
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

                    
                    <label htmlFor={`category${formNum}`}>Category:</label>
                    <select id={`category${formNum}`}>
                        <option>Gas</option>
                        <option>Groceries</option>
                        <options>Rent</options>
                    </select>

                    <label htmlFor={`recurs${formNum}`}>Recurs:</label>
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
                        id={`date${formNum}`}
                        type='date'
                        text='Date:'
                    />

                    <InputWithLabel
                        id={`amount${formNum}`}
                        type='number'
                        text='Amount:'
                    />
                </div>
                
                <div className={style.secondColumn}>
                    <label htmlFor={`notes${formNum}`}>Notes:</label>
                    <textarea id={`notes${formNum}`} className={style.textarea}/>
                </div>

                <button 
                    className={style.delete} 
                    onClick={onButtonClick}
                    data-form={formNum}>
                        -
                </button>
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