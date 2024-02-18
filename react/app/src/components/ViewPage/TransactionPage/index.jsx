/* eslint-disable react/prop-types */
import InputWithLabel from "../../InputWithLabel";
import SelectWithLabel from "../../SelectWithLabel"
import { useContext } from "react";
import TextAreaWithLabel from "../../TextAreaWithLabel";
import TransactionContext from "../../../stores/TransactionContext";
import style from "../style.module.css";
import DataContext from "../../../stores/DataContext";

const TransactionPage = () => {
    const tc = useContext(TransactionContext);
    const dc = useContext(DataContext);
    const categories = dc.categories;
    const transaction = tc.selectedTransaction;

    const names = {
        category: "category",
        startDate: "startDate",
        endDate: "endDate",
        amount: "amount",
        notes: "notes"
    };

    const handleChange = (event) => {
        const target = event.target;
        const attributeName = target.name;
        let value = target.value;

        if (attributeName === "amount") {
            const digits = /[0-9]+[.]*[0-9]{0,2}/;
            const match = value.match(digits);

            if (match === null) {
                value = "0"
            } else {
                value = match[0];
                if (value[0] === "0" && (value.length == 1 || value[1] != ".")) {
                    value = value.substring(1);
                }
            }
        }

        if (attributeName === "category") {
            value = Number.parseInt(value);
            value = categories.filter(category => category.id === value)[0];
        }

        tc.updateSelectedTransaction(attributeName, value);
    }

    const handleDelete = async (event) => {
        event.preventDefault();

        const successful = await tc.deleteSelectedTransaction();
        if (!successful) {
            console.log('Failed to delete transaction');
        }
    }
    
    const handleUpdate = async (event) => {
        event.preventDefault();
        
        const successful = tc.saveSelectedTransactionUpdates();
        if (!successful) {
            console.log('Failed to update transaction');
        }
    }

    return (
        <>
            {transaction === null ? (
                <section className={style.header}>
                    <h1>No transactions to view.</h1>
                </section>
            ) : (
                <section>
                    <form className={style.form}>
                        <div className={style.topLeft}>
                            <h1>{transaction.category.type.name}</h1>
                            <SelectWithLabel 
                                id={names.category}
                                name={names.category}
                                items={categories.filter(category => category.type.id === transaction.category.type.id)}
                                value={transaction.category.id}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={style.topRight}>
                            <InputWithLabel
                                id={names.startDate}
                                name={names.startDate}
                                type="date"
                                text={transaction.endDate === null ? "Date:" : "Start Date:"}
                                value={transaction.startDate}
                                onChange={handleChange}
                            />
                            {transaction.endDate === null ? null : (
                                <InputWithLabel
                                    id={names.endDate}
                                    name={names.endDate}
                                    type="date"
                                    text="End Date:"
                                    value={transaction.endDate}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                        
                        <div className={style.amount}>
                            <input 
                                name={names.amount}
                                type="text" 
                                value={`$${transaction.amount}`} 
                                onChange={handleChange}
                            />
                        </div>
                        

                        <div className={style.notes}>
                            <TextAreaWithLabel 
                                id={names.notes}
                                name={names.notes}
                                text="Notes:"
                                value={transaction.notes}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className={style.buttons}>
                            <button className="button" onClick={handleDelete}>Delete</button>
                            <button className="button" onClick={handleUpdate}>Update</button>
                        </div>
                    </form>
                </section>
            )}
        </>
    )
}

export default TransactionPage;