/* eslint-disable react/prop-types */
import { postData } from '../../../utils/functions';
import DataContext from '../../App/DataContext';
import InputWithLabel from '../../InputWithLabel';
import RadioButtonWithLabel from '../../RadioButtonWithLabel';
import Scrollpane from '../../Scrollpane';
import SelectWithLabel from '../../SelectWithLabel';
import style from './style.module.css'
import { Transaction } from '../../../models';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useList, useObject } from '../../../utils/hooks';
import { v4 as uuidv4 } from 'uuid';

const TransactionPage = () => {
    const [forms, setForms] = useState([]);
    const [transactions, setTransactions, updateTransaction] = useList([]);
    const dataContext = useContext(DataContext);
    const categories = dataContext.categories;
    const types = dataContext.types;

    useEffect(() => {
        const transaction = new Transaction();
        const transactionForm = createTransactionForm(transaction, handleDelete, handleTransactionChange, categories, types);
        transaction.key = transactionForm.key;
        transaction.identifier = transactionForm.key;
        transaction.recurs = false;

        if (types.length > 0) {
            const defaultType = types.filter(type => type.name.toLowerCase() === "expense")[0];
            if (defaultType) {
                transaction.type = defaultType.id;
            }
        }
        
        setForms([transactionForm]);
        setTransactions([transaction]);
    }, [categories, types]);

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

    const handleAdd = useCallback((event) => {
        event.preventDefault();
        const transaction = new Transaction();

        setForms(prevForms => {
            const transactionForm = createTransactionForm(transaction, handleDelete, handleTransactionChange, categories, types);
            transaction.key = transactionForm.key;
            transaction.identifier = transactionForm.key;
            transaction.recurs = false;
            return prevForms.concat([transactionForm]);
        });

        setTransactions(prevTransactions => prevTransactions.concat([transaction]));
    }, [categories, types]);

    const handleSave = useCallback(async (event) => {
        event.preventDefault();

        const uri = `http://localhost:8080/api/transactions`;
        const updatedTransactions = await postData(uri, transactions);
        if (!updatedTransactions.length > 0) {
            setTransactions([]);
        }
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

const createTransactionForm = (transaction, onButtonClick, handleTransactionChange, categories, types) => {
    const id = uuidv4();

    return (
        <li key={id} data-key={id}>
            <TransactionForm 
                id={id}
                initialTransaction={transaction} 
                onButtonClick={onButtonClick}
                handleTransactionChange={handleTransactionChange}
                categories={categories}
                types={types}
            />
        </li>
    )
} 

const TransactionForm = ({id, initialTransaction, onButtonClick, handleTransactionChange, categories, types}) => {
    const [transaction, __, updateTransaction] = useObject(initialTransaction);
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
                        types={types}
                    />

                    <SelectWithLabel 
                        id={names['category']}
                        name={names['category']}
                        text='Category:'
                        items={categories.filter(category => category.type_id === transaction.type)}
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

const TypeSelection = ({name, transaction, onChange, types}) => {
    return (
        <>
            <label htmlFor={name}>Type:</label>
            <div>
                {types.map(type => (
                    <RadioButtonWithLabel 
                        key={type.id}
                        name={name}
                        value={type.id}
                        text={type.name}
                        onChange={onChange}
                        checked={transaction.type === type.id}
                        wrapped
                    />
                ))}
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