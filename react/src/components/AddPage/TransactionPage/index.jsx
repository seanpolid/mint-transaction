/* eslint-disable react/prop-types */
import InputWithLabel from '../../InputWithLabel';
import RadioButtonWithLabel from '../../RadioButtonWithLabel';
import Scrollpane from '../../Scrollpane';
import SelectWithLabel from '../../SelectWithLabel';
import style from './style.module.css'
import TransactionContext from '../../../stores/TransactionContext'
import TextAreaWithLabel from '../../TextAreaWithLabel';
import { useCallback, useContext } from 'react';
import DataContext from '../../../stores/DataContext';

const TransactionPage = () => {
    const tc = useContext(TransactionContext);

    const handleDelete = useCallback((event) => {
        event.preventDefault();
        const key = event.target.parentNode.parentNode.getAttribute("data-key");
        
        if (tc.newTransactions.length > 1) {
            tc.deleteNewTransaction(key);
        }
    }, [tc.newTransactions]);

    const handleAdd = useCallback((event) => {
        event.preventDefault();
        tc.addNewTransaction();
    }, [tc.addNewTransaction]);

    const handleSave = useCallback(async (event) => {
        event.preventDefault();
        tc.saveNewTransactions();
    }, [tc.saveNewTransactions]);

    return (
        <>
            <Scrollpane className={style.transactionContainer}>
                <ul>
                    {tc.newTransactions.map(transaction => (
                        <li key={transaction.identifier} data-key={transaction.identifier}>
                            <Form 
                                transaction={transaction} 
                                onButtonClick={handleDelete}
                            />   
                        </li>
                    ))}
                </ul>

                <div className={style.options}>
                    <button className="button" onClick={handleAdd}>Add</button>
                    <button className="button" onClick={handleSave}>Save</button>
                </div>
            </Scrollpane>
        </>
    )
}

const Form = ({transaction, onButtonClick}) => {
    const tc = useContext(TransactionContext);
    const dc = useContext(DataContext);
    const categories = dc.categories;
    const types = dc.types;

    const identifier = transaction.identifier;
    const names = {
        ['startDate']: `startDate_${identifier}`,
        ['endDate']: `endDate_${identifier}`,
        ['type']: `type_${identifier}`,
        ['category']: `category_${identifier}`,
        ['recurs']: `recurs_${identifier}`,
        ['amount']: `amount_${identifier}`,
        ['notes']: `notes_${identifier}`
    }

    const handleChange = useCallback((event) => {
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
        
        if (attributeName === "type") {
            value = types.filter(type => type.id === Number.parseInt(value))[0];
        }

        if (attributeName === "category") {
            value = categories.filter(category => category.id === Number.parseInt(value))[0];
        }

        tc.updateNewTransaction(attributeName, value, key);
    }, [categories, types]);

    const handleWheel = (event) => {
        event.target.blur();
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
                        items={categories.filter(category => category.type.id === transaction.type.id)}
                        value={transaction.category ? transaction.category.id : null}
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
                        text='Amount ($):'
                        value={transaction.amount}
                        onChange={handleChange}
                        step={"0.01"}
                        onWheel={handleWheel}
                        min="0"
                    />
                </div>
                
                <div className={style.secondColumn}>
                    <TextAreaWithLabel 
                        id={names['notes']}
                        name={names['notes']}
                        text="Notes:"
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
        <fieldset>
            <legend>Type:</legend>
            <div>
                {types.map(type => (
                    <RadioButtonWithLabel 
                        key={type.id}
                        name={name}
                        value={type.id}
                        text={type.name}
                        onChange={onChange}
                        checked={transaction.type.id === type.id}
                        wrapped
                    />
                ))}
            </div>
        </fieldset>
    )
}

const RecursSelection = ({names, transaction, onChange}) => {
    return (
        <>
            <fieldset>
                <legend>Recurs:</legend>
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
            </fieldset>
            
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