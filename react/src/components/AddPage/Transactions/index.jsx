/* eslint-disable react/prop-types */
import InputWithLabel from '../../InputWithLabel';
import RadioButtonWithLabel from '../../RadioButtonWithLabel';
import Scrollpane from '../../Scrollpane';
import SelectWithLabel from '../../SelectWithLabel';
import style from './style.module.css'
import Transaction from '../../../models/Transaction';
import { transactionType } from '../../../enums';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TransactionPage = () => {
    const [forms, setForms] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const transaction = new Transaction();
        const transactionForm = createTransactionForm(1, handleDelete, transaction);
        transaction.key = transactionForm.key;
        
        setForms([transactionForm]);
        setTransactions([transaction]);
    }, []);

    useEffect(() => {
        console.log(transactions)
    }, [transactions]);

    const handleDelete = (event) => {
        event.preventDefault();
        const key = event.target.parentNode.parentNode.getAttribute("data-key");
        
        setForms(prevForms => {
            if (prevForms.length > 1) {
                return prevForms.filter(form => form.key !== key)
                                .map((form, index) => updateTransactionForm(form, index));
            }
            return prevForms;
        });

        setTransactions(prevTransactions => {
            if (prevTransactions.length > 1) {
                return prevTransactions.filter(transaction => transaction.key !== key)
            }
        })
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const transaction = new Transaction();
        setForms(prevForms => {
            const form = createTransactionForm(prevForms.length + 1, handleDelete, transaction);
            transaction.key = form.key;
            return prevForms.concat([form]);
        });
        setTransactions(prevTransactions => prevTransactions.concat([transaction]));
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
    const id = uuidv4();

    return (
        <li key={id} data-key={id}>
            <TransactionForm formNum={formNum} onButtonClick={onButtonClick} />
        </li>
    )
} 

const updateTransactionForm = (form, index) => {
    const newIndex = index + 1;

    return (
        <li key={form.key} data-key={form.key}>
            <TransactionForm 
                formNum={newIndex}
                onButtonClick={form.props.children.props.onButtonClick}
            />
        </li>
    )
}

const TransactionForm = ({formNum, onButtonClick}) => {
    const names = {
        ['type']: `type${formNum}`,
        ['category']: `category${formNum}`,
        ['recurs']: `recurs${formNum}`
    }

    const handleTypeChange = (event) => {
        console.log(event.target);
    }

    const handleCategoryChange = (event) => {
        console.log(event);
    }

    const handleRecursChange = (event) => {
        console.log(event.target);
    }

    return (
        <>
            <form className={style.transactionForm}>
                <div className={style.firstColumn}>
                    <label htmlFor={names['type']}>Type:</label>
                    <div>
                        <RadioButtonWithLabel 
                            name={names['type']}
                            value='income'
                            text='Income'
                            onChange={handleTypeChange}
                        />
                        
                        <RadioButtonWithLabel
                            name={names['type']}
                            value='expense'
                            text='Expense'
                            onChange={handleTypeChange}
                            checked
                        />
                    </div>

                    <SelectWithLabel 
                        name={names['category']}
                        text='Category:'
                        items={[]}
                        value=''
                        onChange={handleCategoryChange}
                        wrapped={false}
                    />

                    <label htmlFor={`recurs${formNum}`}>Recurs:</label>
                    <div>
                        <RadioButtonWithLabel
                            name={names['recurs']}
                            value='yes'
                            text='Yes'
                            onChange={handleRecursChange}
                        />

                        <RadioButtonWithLabel
                            name={names['recurs']}
                            value='no'
                            text='No'
                            onChange={handleRecursChange}
                            checked
                        />
                    </div>

                    <InputWithLabel 
                        type='date'
                        text='Date:'
                    />

                    <InputWithLabel
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
                    onClick={onButtonClick}>
                        -
                </button>
            </form>
        </>
    )
}

export default TransactionPage;