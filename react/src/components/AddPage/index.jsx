/* eslint-disable react/prop-types */
import GoalPage from "./GoalPage";
import { tabType } from "../../enums"
import TransactionPage from "./TransactionPage";

const AddPage = ({type}) => {
    const page = {
        [tabType.TRANSACTIONS]: <TransactionPage />,
        [tabType.GOALS]: <GoalPage />
    }

    return page[type];
}

export default AddPage