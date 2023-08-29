/* eslint-disable react/prop-types */
import { tabType } from "../../enums"
import TransactionPage from "./Transactions";

const AddPage = ({type}) => {
    const page = {
        [tabType.TRANSACTIONS]: <TransactionPage />,
        [tabType.GOALS]: <GoalPage />
    }

    return page[type];
}

const GoalPage = () => {
    return (
        <section>
            <h1>Add Goals</h1>
        </section>
    )
}

export default AddPage