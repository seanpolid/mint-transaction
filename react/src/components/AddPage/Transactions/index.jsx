/* eslint-disable react/prop-types */
import InputWithLabel from '../../InputWithLabel';
import RadioButtonWithLabel from '../../RadioButtonWithLabel';
import Scrollpane from '../../Scrollpane';
import SelectWithLabel from '../../SelectWithLabel';
import style from './style.module.css'
import { Transaction, Category } from '../../../models';
import { TransactionDTO } from '../../../dtos';
import { transactionType } from '../../../enums';
import { useState, useEffect, useCallback } from 'react';
import { useList, useObject } from '../../../utils/hooks';
import { v4 as uuidv4 } from 'uuid';

const TransactionPage = () => {
    const [forms, setForms] = useState([]);
    const [transactions, setTransactions, updateTransaction] = useList([]);

    useEffect(() => {
        const transaction = new Transaction();
        const transactionForm = createTransactionForm(transaction, handleDelete, handleTransactionChange);
        transaction.key = transactionForm.key;
        transaction.type = transactionType.EXPENSE;
        transaction.recurs = false
        
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
            const form = createTransactionForm(transaction, handleDelete, handleTransactionChange);
            transaction.key = form.key;
            return prevForms.concat([form]);
        });

        setTransactions(prevTransactions => prevTransactions.concat([transaction]));
    }

    const handleSave = useCallback((event) => {
        event.preventDefault();

        const transactionDTOS = transactions.map(transaction => new TransactionDTO(transaction));
        const uri = `http://localhost:8080/api/transactions`;
        fetch(uri, {
            method: 'POST', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionDTOS)
        })
        .then(response => {
            response.text().then(text => console.log(text));
        })
        .catch(error => {
            console.log("error:", error);
        })
    }, [transactions]);

    const handleTransactionChange = (attributeName, value, key) => {
        updateTransaction(attributeName, value, key);
    }

    return (
        <section>
            <Scrollpane className={style.transactionContainer}>
                <ul>
                    {forms}
                </ul>

                <div className={style.options}>
                    <button onClick={handleAdd}>Add</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </Scrollpane>
        </section>
    )
}

const createTransactionForm = (transaction, onButtonClick, handleTransactionChange) => {
    const id = uuidv4();

    return (
        <li key={id} data-key={id}>
            <TransactionForm 
                id={id}
                initialTransaction={transaction} 
                onButtonClick={onButtonClick}
                handleTransactionChange={handleTransactionChange}
            />
        </li>
    )
} 



const TransactionForm = ({id, initialTransaction, onButtonClick, handleTransactionChange}) => {
    const [transaction, setTransaction, updateTransaction] = useObject(initialTransaction);
    const names = {
        ['startDate']: `startDate_${id}`,
        ['endDate']: `endDate_${id}`,
        ['type']: `type_${id}`,
        ['category']: `category_${id}`,
        ['recurs']: `recurs_${id}`,
        ['amount']: `amount_${id}`,
        ['notes']: `notes_${id}`
    }

    const handleChange = (event) => {
        const target = event.target;
        const [attributeName, key] = target.name.split('_');
        let value = target.value;
        
        const pattern = /^[0-9]+$/;
        if (pattern.test(value)) {
            value = Number.parseInt(value);
        }

        if (value === "true" || value === "false") {
            value = value === "true";
        }

        updateTransaction(attributeName, value);
        handleTransactionChange(attributeName, value, key);
    }

    return (
        <>
            <form className={style.transactionForm}>
                <div className={style.firstColumn}>
                    <TypeSelection
                        name={names['type']}
                        transaction={transaction}
                        onChange={handleChange}
                    />

                    <SelectWithLabel 
                        id={names['category']}
                        name={names['category']}
                        text='Category:'
                        items={[new Category(1, "Testing")]}
                        value={transaction.category}
                        onChange={handleChange}
                        wrapped={false}
                    />

                    <RecursSelection 
                        names={names}
                        transaction={transaction}
                        onChange={handleChange}
                    />

                    <InputWithLabel
                        id={names['amount']}
                        name={names['amount']}
                        type='number'
                        text='Amount:'
                        value={transaction.amount}
                        onChange={handleChange}
                    />
                </div>
                
                <div className={style.secondColumn}>
                    <label htmlFor={names['notes']}>Notes:</label>
                    <textarea 
                        id={names['notes']} 
                        name={names['notes']}
                        className={style.textarea}
                        value={transaction.notes}
                        onChange={handleChange}
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

const TypeSelection = ({name, transaction, onChange}) => {
    return (
        <>
            <label htmlFor={name}>Type:</label>
            <div>
                <RadioButtonWithLabel 
                    name={name}
                    value={transactionType.INCOME}
                    text='Income'
                    onChange={onChange}
                    checked={transaction.type === transactionType.INCOME}
                    wrapped
                />
                
                <RadioButtonWithLabel
                    name={name}
                    value={transactionType.EXPENSE}
                    text='Expense'
                    onChange={onChange}
                    checked={transaction.type !== transactionType.INCOME}
                    wrapped
                />
            </div>
        </>
    )
}

const RecursSelection = ({names, transaction, onChange}) => {
    return (
        <>
            <label htmlFor={names['recur']}>Recurs:</label>
            <div>
                <RadioButtonWithLabel
                    name={names['recurs']}
                    value={true}
                    text='Yes'
                    onChange={onChange}
                    checked={transaction.recurs}
                    wrapped
                />

                <RadioButtonWithLabel
                    name={names['recurs']}
                    value={false}
                    text='No'
                    onChange={onChange}
                    checked={!transaction.recurs}
                    wrapped
                />
            </div>

            {transaction.recurs ? (
                <>
                    <InputWithLabel 
                        id={names['startDate']}
                        name={names['startDate']}
                        type='date'
                        text='Start Date:'
                        value={transaction.startDate}
                        onChange={onChange}
                    />
                    <InputWithLabel 
                        id={names['endDate']}
                        name={names['endDate']}
                        type='date'
                        text='End Date:'
                        value={transaction.endDate}
                        onChange={onChange}
                    />
                </>
            ) : (
                <InputWithLabel 
                    id={names['startDate']}
                    name={names['startDate']}
                    type='date'
                    text='Date:'
                    value={transaction.startDate}
                    onChange={onChange}
                />
            )}
        </>
    )
}

export default TransactionPage;