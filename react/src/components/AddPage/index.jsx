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
            <h1>Add Transactions</h1>
        </section>
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