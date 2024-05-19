/* eslint-disable react/prop-types */
import ForecastPage from "./ForecastPage";
import { tabType } from "../../enums"
import TransactionPage from "./TransactionPage";

const AddPage = ({type}) => {
    const page = {
        [tabType.TRANSACTIONS]: <TransactionPage />,
        [tabType.FORECASTS]: <ForecastPage />
    }

    return page[type];
}

export default AddPage