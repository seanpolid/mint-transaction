/* eslint-disable react/prop-types */
import DataContext from "../../DataContext";
import { useContext } from "react";

const TransactionPage = () => {
    const dataContext = useContext(DataContext);
    const transaction = dataContext.selectedTransaction;
    console.log(transaction);
    return (
        <section>
            <h1>Transaction</h1>
        </section>
    )
}

export default TransactionPage;