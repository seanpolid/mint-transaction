/* eslint-disable react/prop-types */
import { useObject } from "../../../utils/hooks";
import DataContext from "../../DataContext";
import InputWithLabel from "../../InputWithLabel";
import SelectWithLabel from "../../SelectWithLabel"
import { useContext } from "react";
import TextAreaWithLabel from "../../TextAreaWithLabel";
import style from "../style.module.css";

const TransactionPage = () => {
    const dataContext = useContext(DataContext);
    const categories = dataContext.categories;
    const [transaction, setTransaction, updateTransaction] = useObject(dataContext.selectedTransaction);
    const names = {
        category: "category",
        startDate: "startDate",
        endDate: "endDate",
        amount: "amount",
        notes: "notes"
    };

    const handleChange = (event) => {
        console.log(event);
    }

    return (
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
                        text="Start Date:"
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
                        text="Notes:"
                        value={transaction.notes}
                        onChange={handleChange}
                    />
                </div>
                
                <div className={style.buttons}>
                    <button className="button">Delete</button>
                    <button className="button">Update</button>
                </div>
            </form>
        </section>
    )
}

export default TransactionPage;