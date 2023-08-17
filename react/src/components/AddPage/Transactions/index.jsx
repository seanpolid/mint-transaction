/* eslint-disable react/prop-types */
import InputWithLabel from '../../InputWithLabel';
import RadioButtonWithLabel from '../../RadioButtonWithLabel';
import Scrollpane from '../../Scrollpane';
import SelectWithLabel from '../../SelectWithLabel';
import style from './style.module.css'
import Transaction from '../../../models/Transaction';
import { transactionType, decision } from '../../../enums';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TransactionPage = () => {
    const [forms, setForms] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const transaction = new Transaction();
        const transactionForm = createTransactionForm(handleDelete, transaction);
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
            console.log("prevForms: ", prevForms);
            if (prevForms.length > 1) {
                return prevForms.filter(form => form.key !== key);
            }
            return prevForms;
        });

        setTransactions(prevTransactions => {
            if (prevTransactions.length > 1) {
                return prevTransactions.filter(transaction => transaction.key !== key);
            }
            return prevTransactions;
        })
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const transaction = new Transaction();

        setForms(prevForms => {
            const form = createTransactionForm(handleDelete, transaction);
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

const createTransactionForm = (onButtonClick, transaction) => {
    const id = uuidv4();

    return (
        <li key={id} data-key={id}>
            <TransactionForm 
                id={id}
                onButtonClick={onButtonClick}
                transaction={transaction} 
            />
        </li>
    )
} 

const TransactionForm = ({id, onButtonClick, transaction}) => {
    const names = {
        ['startDate']: `startDate-${id}`,
        ['endDate']: `endDate-${id}`,
        ['type']: `type-${id}`,
        ['category']: `category-${id}`,
        ['recurs']: `recurs-${id}`,
        ['amount']: `amount-${id}`,
        ['notes']: `notes-${id}`
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

    const handleDateChange = (event) => {
        console.log(event.target);
    }

    const handleAmountChange = (event) => {
        console.log(event.target);
    }

    const handleNotesChange = (event) => {
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
                            value={transactionType.INCOME}
                            text='Income'
                            onChange={handleTypeChange}
                            checked={transaction.type === transactionType.INCOME}
                        />
                        
                        <RadioButtonWithLabel
                            name={names['type']}
                            value={transactionType.EXPENSE}
                            text='Expense'
                            onChange={handleTypeChange}
                            checked={transaction.type === transactionType.EXPENSE}
                        />
                    </div>

                    <SelectWithLabel 
                        id={names['category']}
                        name={names['category']}
                        text='Category:'
                        items={[]}
                        value={transaction.category}
                        onChange={handleCategoryChange}
                        wrapped={false}
                    />

                    <label htmlFor={names['recur']}>Recurs:</label>
                    <div>
                        <RadioButtonWithLabel
                            name={names['recurs']}
                            value={true}
                            text='Yes'
                            onChange={handleRecursChange}
                            checked={transaction.recurs}
                        />

                        <RadioButtonWithLabel
                            name={names['recurs']}
                            value={false}
                            text='No'
                            onChange={handleRecursChange}
                            checked={!transaction.recurs}
                        />
                    </div>

                    {transaction.recurs ? (
                        <>
                            <InputWithLabel 
                                id={names['startDate']}
                                type='startDate'
                                text='Start Date:'
                                value={transaction.startDate}
                                onChange={handleDateChange}
                            />
                            <InputWithLabel 
                                id={names['endDate']}
                                type='endDate'
                                text='End Date:'
                                value={transaction.endDate}
                                onChange={handleDateChange}
                            />
                        </>
                    ) : (
                        <InputWithLabel 
                            id={names['startDate']}
                            type='date'
                            text='Date:'
                            value={transaction.startDate}
                            onChange={handleDateChange}
                        />
                    )}

                    <InputWithLabel
                        id={names['amount']}
                        type='number'
                        text='Amount:'
                        value={transaction.amount}
                        onChange={handleAmountChange}
                    />
                </div>
                
                <div className={style.secondColumn}>
                    <label htmlFor={names['notes']}>Notes:</label>
                    <textarea 
                        id={names['notes']} 
                        className={style.textarea}
                        value={transaction.notes}
                        onChange={handleNotesChange}
                    />
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