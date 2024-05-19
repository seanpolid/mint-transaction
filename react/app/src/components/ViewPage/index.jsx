/* eslint-disable react/prop-types */
import ForecastPage from './ForecastPage'
import style from './style.module.css'
import { tabType } from '../../enums'
import TransactionPage from './TransactionPage'

const ViewPage = ({type}) => {
    const page = {
        [tabType.TRANSACTIONS]: <TransactionPage />,
        [tabType.FORECASTS]: <ForecastPage />
    }

    return (
        <section className={style.container}>
            {page[type]}
        </section>
    )
}

export default ViewPage